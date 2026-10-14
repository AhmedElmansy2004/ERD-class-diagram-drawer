package com.mansy.erdiagram.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.MediaType;

import com.mansy.erdiagram.ai.GeminiClient;
import com.mansy.erdiagram.api.dto.GenerateRequest;


@RestController 
@RequestMapping("/api")
public class GenerateController {

    private final GeminiClient client;

    public GenerateController(GeminiClient client){
        this.client = client;
    }
    
    @PostMapping(value = "/generate", produces = MediaType.APPLICATION_JSON_VALUE)
    public String generateGraph(@RequestBody GenerateRequest request){

        return client.generate(request.description());
    }
}
