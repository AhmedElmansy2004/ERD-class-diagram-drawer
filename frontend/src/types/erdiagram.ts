export type Participation = 'PARTIAL' | 'TOTAL';

export type KeyType = 'PRIMARY_KEY' | 'FOREIGN_KEY' | 'PARTIAL_KEY' | 'NONE'

export type AttributeType = | 'ATTRIBUTE'
                            | 'MULTIVALUED_ATTRIBUTE'
                            | 'COMPOSITE_ATTRIBUTE'
                            | 'DERIVED_ATTRIBUTE'

export interface RelationshipEntity{
    name: string
    cardinality: string
    participationLimit?: string
    participation?: Participation
}

export interface Attribute{
    name: string
    keyType: KeyType
    attributeType: AttributeType
    composite?: Attribute[]
}

export interface Entity{
    name: string
    isWeak: boolean
    attributes: Attribute[]
}

export interface Relationship{
    name: string
    isIdentifying: boolean
    entities: RelationshipEntity[]
    attributes?: Attribute[]
}

export interface Erdiagram{
    entities: Entity[]
    relationships: Relationship[]
}