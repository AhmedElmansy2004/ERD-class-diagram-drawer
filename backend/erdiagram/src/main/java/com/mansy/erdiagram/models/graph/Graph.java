package com.mansy.erdiagram.models.graph;

import java.util.List;

public record Graph(
    List<Node> nodes,
    List<Edge> edges
) {
    public Graph {
        nodes = (nodes == null) ? List.of() : List.copyOf(nodes);
        edges = (edges == null) ? List.of() : List.copyOf(edges);
    }
}
