package com.mansy.erdiagram.models.erd;

public record Relationship(
    String name,
    String entity1,
    String entity2,
    Participation participation1,
    Participation participation2,
    String cardinality,
    boolean isIdentifying
) {}
