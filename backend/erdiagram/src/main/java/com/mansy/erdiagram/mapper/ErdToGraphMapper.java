package com.mansy.erdiagram.mapper;

import java.util.ArrayList;
import java.util.List;

import com.mansy.erdiagram.models.erd.*;
import com.mansy.erdiagram.models.graph.*;

public class ErdToGraphMapper {

    int edgeId = 0;
    List<Node> nodes = new ArrayList<Node>();
    List<Edge> edges = new ArrayList<Edge>();

    public Graph toGraph(ErDiagram diagram){

        for (Entity entity : diagram.entities()) {
            NodeType entityType = entity.isWeak()? NodeType.WEAK_ENTITY: NodeType.ENTITY;
            nodes.add(new Node(entity.name(), entity.name(), entityType));

            for(Attribute attr: entity.attributes()){
                addAttributeNode(attr);
                addEdge("", entity.name(), attr.name(), EdgeType.ATTRIBUTE_LINK, Participation.PARTIAL);
            }
        }

        for(Relationship rel: diagram.relationships()){
            addRelationshipNode(rel);
        }

        return new Graph(nodes, edges);
    }

    void addEdge(String label, String source, String target, EdgeType type, Participation par){
        this.edges.add(new Edge(String.valueOf(this.edgeId++), label, source, target, type, par));
    }

    void addNode(String name, NodeType type){
        this.nodes.add(new Node(name, name, type));
    }

    void addRelationshipNode(Relationship rel){
        NodeType relationType = rel.isIdentifying()?
            NodeType.IDENTIFYING_RELATIONSHIP: NodeType.RELATIONSHIP;

        addNode(rel.name(), relationType);
        addEdge(rel.cardinality(), rel.name(),
            rel.entity1(), EdgeType.RELATIONSHIP_LINK, rel.participation1());
        addEdge(rel.cardinality(), rel.name(),
            rel.entity2(), EdgeType.RELATIONSHIP_LINK, rel.participation2());
    }

    void addAttributeNode(Attribute attr){
        if(attr.composite().size() > 0){
            for(String a: attr.composite()){
                addNode(a, NodeType.ATTRIBUTE);
                addEdge("", attr.name(), a, EdgeType.ATTRIBUTE_LINK, Participation.PARTIAL);
            }
        }

        addNode(attr.name(), getNodeType(attr));
    }

    NodeType getNodeType(Attribute attr){
        if(attr.isPrimaryKey())
            return NodeType.PRIMARY_KEY_ATTRIBUTE;
        else if(attr.isForeignKey())
            return NodeType.FOREIGN_KEY_ATTRIBUTE;
        else if(attr.isMultiValued())
            return NodeType.MULTIVALUED_ATTRIBUTE;
        else if(attr.isDerived())
            return NodeType.DERIVED_ATTRIBUTE;
        else if(attr.isPartialKey())
            return NodeType.PARTIAL_KEY_ATTRIBUTE;
        else if(attr.composite().size() > 0)
            return NodeType.COMPOSITE_ATTRIBUTE;
        else
            return NodeType.ATTRIBUTE;
    }
}
