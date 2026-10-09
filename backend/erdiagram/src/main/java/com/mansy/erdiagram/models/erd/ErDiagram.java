package com.mansy.erdiagram.models.erd;

import java.util.List;

public record ErDiagram(
    List<Entity> entities,
    List<Relationship> relationships
) {
    public ErDiagram {
        entities = (entities == null) ? List.of() : List.copyOf(entities);
        relationships = (relationships == null) ? List.of() : List.copyOf(relationships);
    }
}