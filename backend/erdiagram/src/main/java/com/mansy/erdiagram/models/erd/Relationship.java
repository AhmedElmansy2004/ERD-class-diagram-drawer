package com.mansy.erdiagram.models.erd;

import java.util.List;

public record Relationship(
    String name,
    boolean isIdentifying,
    List<RelationshipEntity> entities,
    List<Attribute> attributes
) {
    public Relationship {
        entities = (entities == null) ? List.of() : List.copyOf(entities);
        attributes = (attributes == null) ? List.of() : List.copyOf(attributes);
    }
}
