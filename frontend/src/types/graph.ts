export type NodeType = 
    | 'ENTITY'
    | 'WEAK_ENTITY' 
    | 'ATTRIBUTE'
    | 'KEY_ATTRIBUTE'
    | 'MULTIVALUED_ATTRIBUTE'
    | 'COMPOSITE_ATTRIBUTE'
    | 'DERIVED_ATTRIBUTE'
    | 'RELATIONSHIP'
    | 'IDENTIFYING_RELATIONSHIP';

export type EdgeType = 'ATTRIBUTE_LINK' | 'RELATIONSHIP_LINK';
export type Participation = 'PARTIAL' | 'TOTAL';

export interface GraphNode{
    id: string;
    label: string;
    type: NodeType;
}

export interface GraphEdge{
    id: string;
    label?: string;
    source: string;
    target: string;
    type: EdgeType;
    participation?: Participation;
}

export interface GraphResponse{
    nodes: GraphNode[];
    edges: GraphEdge[];
}