package com.mansy.erdiagram.models.erd;

public record Relationship(
    String name,
    Entity entity1,
    Entity entity2,
    String participation1,
    String participation2,
    String cardinality,
    boolean isIdentifying) {}
