package com.mansy.erdiagram.ai;

import org.springframework.stereotype.Component;

@Component
public class PromptBuilder {

    private static final String INSTRUCTIONS = """
        Convert the following system description into an ER diagram, as a single JSON object.

        SCHEMA:
        {
          "entities": [
            {
              "name": string,                  // unique across all entities
              "isWeak": boolean,
              "attributes": [Attribute]
            }
          ],
          "relationships": [
            {
              "name": string,                  // a verb or short phrase, e.g. "WorksFor"
              "isIdentifying": boolean,        // true only for a weak entity's identifying relationship
              "entities": [
                {
                  "name": string,              // must exactly match a name in "entities"
                  "cardinality": string,       // "1", "N" or "M"
                  "participation": "TOTAL" | "PARTIAL",
                  "participationLimit": string // optional minimum, e.g. "0" or "1"; omit if not needed
                }
              ],
              "attributes": [Attribute]        // optional, attributes that belong to the relationship itself
            }
          ]
        }

        Attribute:
        {
          "name": string,                      // unique among its siblings
          "keyType": "PRIMARY_KEY" | "PARTIAL_KEY" | "FOREIGN_KEY" | "NONE",
          "attributeType": "ATTRIBUTE" | "MULTIVALUED_ATTRIBUTE" | "COMPOSITE_ATTRIBUTE" | "DERIVED_ATTRIBUTE",
          "composite": [Attribute]             // only when attributeType is COMPOSITE_ATTRIBUTE
        }

        RULES:
        1. Every strong entity has exactly one PRIMARY_KEY attribute (or several for a composite key).
        2. Every weak entity has isWeak = true, at least one PARTIAL_KEY attribute, no PRIMARY_KEY,
           and takes part in at least one relationship with isIdentifying = true.
        3. Use keyType NONE for ordinary attributes. Do not add foreign key attributes:
           relationships already express them.
        4. Use COMPOSITE_ATTRIBUTE for attributes with parts (e.g. Name -> First, Last) and put the
           parts in "composite" as ATTRIBUTE. Use MULTIVALUED_ATTRIBUTE for attributes that can hold
           several values (e.g. Phone). Use DERIVED_ATTRIBUTE for computed ones (e.g. Age from BirthDate).
        5. Every relationship lists at least two entries in "entities". A recursive relationship lists
           the same entity twice (e.g. Employee Supervises Employee).
        6. Cardinality: one-to-many uses "1" and "N"; many-to-many uses "N" and "M".
        7. Only include entities, attributes and relationships stated or clearly implied by the
           description. Do not invent extras.
        8. Use PascalCase for entity and relationship names and camelCase for attribute names.

        EXAMPLE OUTPUT (for "employees work for one department and have dependents"):
        {"entities":[{"name":"Employee","isWeak":false,"attributes":[{"name":"id","keyType":"PRIMARY_KEY","attributeType":"ATTRIBUTE"}]},{"name":"Department","isWeak":false,"attributes":[{"name":"code","keyType":"PRIMARY_KEY","attributeType":"ATTRIBUTE"}]},{"name":"Dependent","isWeak":true,"attributes":[{"name":"depName","keyType":"PARTIAL_KEY","attributeType":"ATTRIBUTE"}]}],"relationships":[{"name":"WorksFor","isIdentifying":false,"entities":[{"name":"Employee","cardinality":"N","participation":"TOTAL"},{"name":"Department","cardinality":"1","participation":"PARTIAL"}]},{"name":"DependentsOf","isIdentifying":true,"entities":[{"name":"Employee","cardinality":"1","participation":"PARTIAL"},{"name":"Dependent","cardinality":"N","participation":"TOTAL"}]}]}

        Respond with raw JSON only: no markdown fences, no comments, no extra text.
        """;

    public String build(String description){
        return INSTRUCTIONS + "\n\nDescription:\n" + description;
    }

    public String buildRetry(String description, String problem){
        return build(description) + "\n\nYour previous output failed validation: "
                                 + problem + "\nFix the error and output valid JSON matching the schema.";
    }
}