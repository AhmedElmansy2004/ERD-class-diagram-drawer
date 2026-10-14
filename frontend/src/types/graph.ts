import type { KeyType, Participation } from "./erdiagram";

export type NodeType = 
    | 'ENTITY'
    | 'WEAK_ENTITY' 
    | 'ATTRIBUTE'
    | 'MULTIVALUED_ATTRIBUTE'
    | 'COMPOSITE_ATTRIBUTE'
    | 'DERIVED_ATTRIBUTE'
    | 'RELATIONSHIP'
    | 'IDENTIFYING_RELATIONSHIP' 

export interface GraphNode{
    id: string;
    label: string;
    type: NodeType;
    key?: KeyType;
}

export interface GraphEdge{
    id: string;
    label?: string;
    source: string;
    target: string;
    participation?: Participation;
}

export interface GraphResponse{
    nodes: GraphNode[];
    edges: GraphEdge[];
}