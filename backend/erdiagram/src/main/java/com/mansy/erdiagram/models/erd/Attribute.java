package com.mansy.erdiagram.models.erd;

import java.util.List;

public record Attribute(
    String name, 
    KeyType keyType,
    AttributeType attributeType,
    List<String> composite
    
){
    public Attribute {
        composite = (composite == null) ? List.of() : List.copyOf(composite);
    }
 }
