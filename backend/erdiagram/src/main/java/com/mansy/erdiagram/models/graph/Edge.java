package com.mansy.erdiagram.models.graph;

import com.mansy.erdiagram.models.erd.Participation;

public record Edge(
    String id,
    String label,
    String source,
    String target,
    EdgeType type,
    Participation participation
) {
    
}
