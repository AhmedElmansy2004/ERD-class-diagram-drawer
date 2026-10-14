package com.mansy.erdiagram.models.erd;

public record RelationshipEntity(
    String name,
    String cardinality,
    String participationLimit,
    Participation participation
) {
    
}
