package com.mansy.erdiagram.models.erd;

import java.util.List;

public record Attribute(
    String name, 
    List<String> composite,
    boolean isPrimaryKey,
    boolean isForeignKey,
    boolean isMultiValued,
    boolean isDerived,
    boolean isPartialKey
){
    public Attribute {
        composite = (composite == null) ? List.of() : List.copyOf(composite);
    }
 }
