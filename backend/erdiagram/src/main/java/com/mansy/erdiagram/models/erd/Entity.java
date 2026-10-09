package com.mansy.erdiagram.models.erd;

import java.util.List;

public record Entity(String name, List<Attribute> attributes, boolean isWeak) {
    public Entity {
        attributes = (attributes == null) ? List.of() : List.copyOf(attributes);
    }
}
