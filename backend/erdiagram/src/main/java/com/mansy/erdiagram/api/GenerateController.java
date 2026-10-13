package com.mansy.erdiagram.api;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.mansy.erdiagram.ai.GeminiClient;
import com.mansy.erdiagram.api.dto.GenerateRequest;
import com.mansy.erdiagram.models.graph.Graph;


@RestController 
@RequestMapping("/api")
public class GenerateController {

    private final GeminiClient client;

    public GenerateController(GeminiClient client){
        this.client = client;
    }
    
    @PostMapping("/generate")
    public Graph generateGraph(@RequestBody GenerateRequest request){

        return client.generate(request.description());
    }
}
