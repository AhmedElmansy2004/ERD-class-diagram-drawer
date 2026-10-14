import type { Attribute, Entity, Erdiagram, Relationship, RelationshipEntity } from "../types/erdiagram";
import type { GraphEdge, GraphNode, GraphResponse } from "../types/graph";

export function mapErdToGraph(erd: Erdiagram): GraphResponse {
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []

  const existingEntities: string[] = []

  for (const entity of erd.entities) {
    if(existingEntities.includes(entity.name))
            throw new Error(`Duplicate entity name: ${entity.name}`)

    existingEntities.push(entity.name)
    addEntity(entity, nodes, edges)
  }

  let relCount = 0

  for (const rel of erd.relationships) {

    for(const entity of rel.entities){
        if(!existingEntities.includes(entity.name))
            throw new Error(`Relationship "${rel.name}" uses undefined entity: ${entity.name}`)
    }

    addRelationship(rel, nodes, edges, relCount)
    relCount++
  }

  return { nodes, edges }
}

function addEntity(entity: Entity, nodes: GraphNode[], edges: GraphEdge[]) {
    const entityNode: GraphNode = {
        id: entity.name,
        label: entity.name,
        type: entity.isWeak ? 'WEAK_ENTITY' : 'ENTITY',
    }   

    nodes.push(entityNode)

    const existingAttributes: string[] = []

    for(const attr of entity.attributes){
        if(existingAttributes.includes(attr.name))
            throw new Error(`Duplicate attribute "${attr.name}" in entity ${entity.name}`)

        existingAttributes.push(attr.name)

        addAttribute(attr, entity.name, nodes, edges)
        
    }
}

function addAttribute(attr: Attribute, parentId: string, nodes: GraphNode[], edges: GraphEdge[]) {

    const NodeId = `${parentId}.${attr.name}`

    const attrNode: GraphNode = {
        id: NodeId,
        label: attr.name,
        type: attr.attributeType,
        key: attr.keyType ?? 'NONE'
    }
    nodes.push(attrNode)

    addAttributeEdge(attr, parentId, edges)

    const existingAttributes: string[] = []

    for(const a of attr.composite ?? []){
        if(existingAttributes.includes(a.name))
            throw new Error(`Duplicate attribute "${a.name}" in ${NodeId}`)

        existingAttributes.push(a.name)

        addAttribute(a, NodeId, nodes, edges)
    }
}

function addRelationship(rel: Relationship, nodes: GraphNode[], edges: GraphEdge[], relCount: number) {

    const relId = `rel:${relCount}:${rel.name}`

    const relNode: GraphNode = {
        id: relId,
        label: rel.name,
        type: rel.isIdentifying ? 'IDENTIFYING_RELATIONSHIP' : 'RELATIONSHIP',
    }

    nodes.push(relNode)

    let entityCount = 0

    for(const entity of rel.entities){
        addRelationshipEdge(entity, relId, edges, entityCount)
        entityCount++
    }

    const existingAttributes: string[] = []

    for(const attr of rel.attributes ?? []){
        if(existingAttributes.includes(attr.name))
            throw new Error(`Duplicate attribute "${attr.name}" in relationship ${rel.name}`)

        existingAttributes.push(attr.name)

        addAttribute(attr, relId, nodes, edges)
    }
}

function addAttributeEdge(attr: Attribute, parentId: string, edges: GraphEdge[]){
    const attrEdge: GraphEdge = {
        id: `${parentId}-${attr.name}`,
        source: parentId,
        target: `${parentId}.${attr.name}`
    }

    edges.push(attrEdge)
}

function addRelationshipEdge(entity: RelationshipEntity, parentId: string, edges: GraphEdge[], entityCount: number){

    let label
    if(entity.participationLimit) label = `(${entity.participationLimit},${entity.cardinality})`
    else label = entity.cardinality

    const relEdge: GraphEdge = {
        id: `${parentId}->${entity.name}#${entityCount}`,
        label: label,
        source: parentId,
        target: entity.name,
        participation: entity.participation ?? 'PARTIAL'
    }

    edges.push(relEdge)
}