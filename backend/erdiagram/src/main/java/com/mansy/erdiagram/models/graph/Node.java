package com.mansy.erdiagram.models.graph;

public record Node(
    String id,
    String label,
    NodeType type
) {
    
}
