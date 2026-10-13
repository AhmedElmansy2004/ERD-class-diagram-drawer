package com.mansy.erdiagram.ai;

import org.springframework.stereotype.Component;

@Component 
public class PromptBuilder {
    
    private static final String INSTRUCTIONS = """
        Convert the following system description into a JSON object representing an ER diagram Graph.
        
        SCHEMA REQUIREMENTS:
        - nodes: Array of objects with fields: id (string), label (string), type (NodeType enum).
        - edges: Array of objects with fields: id (string), label (string, optional/cardinality like "1" or "N"), source (string node id), target (string node id), type (EdgeType enum), participation (Participation enum or null).

        ALLOWED ENUMS:
        - NodeType: ENTITY, WEAK_ENTITY, ATTRIBUTE, PRIMARY_KEY_ATTRIBUTE, FOREIGN_KEY_ATTRIBUTE, PARTIAL_KEY_ATTRIBUTE, MULTIVALUED_ATTRIBUTE, COMPOSITE_ATTRIBUTE, DERIVED_ATTRIBUTE, RELATIONSHIP, IDENTIFYING_RELATIONSHIP
        - EdgeType: ATTRIBUTE_LINK, RELATIONSHIP_LINK
        - Participation: TOTAL, PARTIAL

        Respond with raw JSON only. Do not include markdown formatting or extra text.
        """;

    public String build(String description){
        return INSTRUCTIONS + "\n\nDescription:\n" + description;
    }

    public String buildRetry(String description, String problem){
        return build(description) + "\n\nYour previous output failed validation: "
                                 + problem + "\nFix the error and output valid JSON matching the schema.";
    }
}