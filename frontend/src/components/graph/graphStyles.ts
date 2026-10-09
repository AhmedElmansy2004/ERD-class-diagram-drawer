import type cytoscape from 'cytoscape';

export const graphStyles: cytoscape.StylesheetJson = [
  // defaults for every node
  {
    selector: 'node',
    style: {
      label: 'data(label)',
      'text-valign': 'center',
      'text-halign': 'center',
      'font-size': 12,
      'background-color': '#ffffff',
      'border-width': 1,
      'border-color': '#333',
    },
  },

  // entities: shared look first, then the weak-entity override
  {
    selector: 'node[type = "ENTITY"], node[type = "WEAK_ENTITY"]',
    style: { shape: 'rectangle', width: 90, height: 40, 'background-color': '#ddd' },
  },
  {
    selector: 'node[type = "WEAK_ENTITY"]',
    style: { 'border-style': 'double', 'border-width': 4 },
  },

  // relationships: same pattern
  {
    selector: 'node[type = "RELATIONSHIP"], node[type = "IDENTIFYING_RELATIONSHIP"]',
    style: { shape: 'diamond', width: 120, height: 70, 'background-color': '#bbb' },
  },
  {
    selector: 'node[type = "IDENTIFYING_RELATIONSHIP"]',
    style: { 'border-style': 'double', 'border-width': 4 },
  },

  // attributes: shared ellipse, then per-type overrides
  {
    selector:
      'node[type = "ATTRIBUTE"], node[type = "KEY_ATTRIBUTE"], node[type = "MULTIVALUED_ATTRIBUTE"], node[type = "COMPOSITE_ATTRIBUTE"], node[type = "DERIVED_ATTRIBUTE"]',
    style: { shape: 'ellipse', width: 90, height: 40 },
  },
  {
    selector: 'node[type = "PRIMARY_KEY_ATTRIBUTE"], node[type = "FOREIGN_KEY_ATTRIBUTE"], node[type = "PARTIAL_KEY_ATTRIBUTE"]',
    style: { 'font-weight': 'bold' },
  },
  {
    selector: 'node[type = "MULTIVALUED_ATTRIBUTE"]',
    style: { 'border-style': 'double', 'border-width': 5 },
  },
  {
    selector: 'node[type = "COMPOSITE_ATTRIBUTE"]',
    style: { 'background-color': '#eef3ff' },
  },
  {
    selector: 'node[type = "DERIVED_ATTRIBUTE"]',
    style: { 'border-style': 'dashed' },
  },

  // edges
  {
    selector: 'edge',
    style: {
      width: 1,
      'line-color': '#333',
      'font-size': 11,
      'text-background-color': '#fff',
      'text-background-opacity': 1,
    },
  },
  {
    selector: 'edge[type = "RELATIONSHIP_LINK"]',
    style: { label: 'data(label)' },
  },
  // total participation: fake a double line (white core with dark outline)
  {
    selector: 'edge[participation = "TOTAL"]',
    style: {
      width: 4,
      'line-color': '#fff',
      'line-outline-width': 1.5,
      'line-outline-color': '#333',
    },
  },
];