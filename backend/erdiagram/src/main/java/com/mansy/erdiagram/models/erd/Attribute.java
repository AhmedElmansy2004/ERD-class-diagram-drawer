package com.mansy.erdiagram.models.erd;

public record Attribute(
    String name, 
    String[] composite,
    boolean isPrimaryKey,
    boolean isForeignKey,
    boolean isMultivalue,
    boolean isDerived,
    boolean isPartialKey
) { }
