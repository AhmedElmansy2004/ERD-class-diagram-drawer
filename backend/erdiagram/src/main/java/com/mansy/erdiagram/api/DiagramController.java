package com.mansy.erdiagram.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mansy.erdiagram.mapper.ErdToGraphMapper;
import com.mansy.erdiagram.models.erd.ErDiagram;
import com.mansy.erdiagram.models.graph.Graph;

@RestController
@RequestMapping("/api")
public class DiagramController {

    // to check if connection is bug-free
    @GetMapping("/health")
    public String health(){
        return "ok";
    }

    @PostMapping("/diagram")
    public Graph createDiagram(@RequestBody ErDiagram diagram){
        return new ErdToGraphMapper().toGraph(diagram);
    }
}