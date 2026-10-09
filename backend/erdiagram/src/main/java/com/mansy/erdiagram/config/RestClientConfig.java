package com.mansy.erdiagram.config;

import com.mansy.erdiagram.ai.GeminiProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    @Bean
    public RestClient geminiRestClient(GeminiProperties props) {
        return RestClient.builder()
                .baseUrl(props.baseUrl())
                .defaultHeader("x-goog-api-key", props.apiKey())
                .build();
    }
}