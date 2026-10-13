package com.mansy.erdiagram.ai;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import tools.jackson.core.JacksonException;
import tools.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.errors.ApiException;
import com.google.genai.types.GenerateContentConfig;
import com.mansy.erdiagram.exception.GenerationException;
import com.mansy.erdiagram.models.graph.Graph;

@Component
public class GeminiClient {

    private final GeminiProperties props;
    private final PromptBuilder prompts;
    private final ObjectMapper json;

    public GeminiClient(GeminiProperties props, PromptBuilder prompts, ObjectMapper json) {
        this.props = props;
        this.prompts = prompts;
        this.json = json;
    }

    public Graph generate(String description) {
        try {
            return parse(call(prompts.build(description)));
        } catch (JacksonException first) {
            try {   // one retry, telling the model what went wrong
                return parse(call(prompts.buildRetry(description, first.getOriginalMessage())));
            } catch (JacksonException second) {
                throw new GenerationException(
                        HttpStatus.BAD_GATEWAY, "Model returned invalid ER JSON", second);
            }
        }
    }

    private String call(String prompt) {
        if (props.apiKey() == null || props.apiKey().isBlank()) {
            throw new GenerationException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "GEMINI_API_KEY is not set");
        }
        try {
            Client client = Client.builder().apiKey(props.apiKey()).build();
            GenerateContentConfig config = GenerateContentConfig.builder()
                    .responseMimeType("application/json")
                    .temperature(0.2f)
                    .build();
            String text = client.models.generateContent(props.model(), prompt, config).text();
            if (text == null || text.isBlank()) {
                throw new GenerationException(HttpStatus.BAD_GATEWAY, "Empty response from Gemini");
            }
            return text;
        } catch (GenerationException e) {
            throw e;   // already translated, don't re-wrap
        } catch (ApiException e) {
            boolean busy = e.code() == 429 || e.code() == 503;
            throw new GenerationException(
                    busy ? HttpStatus.SERVICE_UNAVAILABLE : HttpStatus.BAD_GATEWAY,
                    busy ? "The AI model is busy. Please try again shortly." : "Gemini request failed",
                    e);
        } catch (RuntimeException e) {
            throw new GenerationException(HttpStatus.BAD_GATEWAY, "Gemini request failed", e);
        }
    }

    private Graph parse(String text) throws JacksonException {
        return json.readValue(text, Graph.class);
    }
}