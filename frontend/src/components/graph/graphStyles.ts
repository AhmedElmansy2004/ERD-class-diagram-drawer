import type cytoscape from 'cytoscape';

const font = 'Inter, system-ui, sans-serif'

export const graphStyles: cytoscape.StylesheetJson = [
  // ---------- nodes: base ----------
  {
    selector: 'node',
    style: {
      label: 'data(label)',
      'font-family': font,
      'font-size': 12,
      'font-weight': 'normal',
      'font-style': 'normal',
      color: '#111111',
      'text-valign': 'center',
      'text-halign': 'center',
      'background-color': '#ffffff',
      'border-width': 1.5,
      'border-color': '#111111',
      'overlay-opacity': 0,
    },
  },

  // ---------- edges ----------
  {
    selector: 'edge',
    style: {
      width: 1.5,
      'line-color': '#525252',
      'line-opacity': 1,
      opacity: 1,
      'curve-style': 'bezier',
      'control-point-step-size': 60,   // fans out parallel edges (recursive relationships)
      'target-arrow-shape': 'none',
      'z-index': 1,
      'font-family': font,
      'font-size': 11,
      color: '#111111',
      'text-background-color': '#ffffff',
      'text-background-opacity': 1,
      'text-background-padding': '2px',
      'overlay-opacity': 0,
    },
  },
  { selector: 'edge[label]', style: { label: 'data(label)' } },
  { selector: 'edge[participation = "TOTAL"]', style: { width: 5, 'line-color': '#111111' } },

  // ---------- entities: solid black, white text ----------
  {
    selector: 'node[type = "ENTITY"], node[type = "WEAK_ENTITY"]',
    style: {
      shape: 'rectangle',
      width: 110,
      height: 44,
      'background-color': '#111111',
      'border-color': '#111111',
      color: '#ffffff',
    },
  },
  {
    // double border on a black node: white gap needs a lighter border color to be visible
    selector: 'node[type = "WEAK_ENTITY"]',
    style: { 'border-style': 'double', 'border-width': 6, 'border-color': '#a3a3a3' },
  },

  // ---------- relationships: white diamonds, black outline ----------
  {
    selector: 'node[type = "RELATIONSHIP"], node[type = "IDENTIFYING_RELATIONSHIP"]',
    style: {
      shape: 'diamond',
      width: 130,
      height: 80,
      'background-color': '#ffffff',
      'border-color': '#111111',
      'border-width': 2,
    },
  },
  {
    selector: 'node[type = "IDENTIFYING_RELATIONSHIP"]',
    style: { 'border-style': 'double', 'border-width': 6 },
  },

  // ---------- attributes: white ellipses, gray outline ----------
  {
    selector:
      'node[type = "ATTRIBUTE"], node[type = "MULTIVALUED_ATTRIBUTE"], node[type = "COMPOSITE_ATTRIBUTE"], node[type = "DERIVED_ATTRIBUTE"]',
    style: {
      shape: 'ellipse',
      width: 90,
      height: 40,
      'font-size': 11,
      'background-color': '#ffffff',
      'border-color': '#525252',
    },
  },
  { selector: 'node[type = "MULTIVALUED_ATTRIBUTE"]', style: { 'border-style': 'double', 'border-width': 5 } },
  { selector: 'node[type = "COMPOSITE_ATTRIBUTE"]', style: { 'background-color': '#e5e5e5' } },
  { selector: 'node[type = "DERIVED_ATTRIBUTE"]', style: { 'border-style': 'dashed' } },

  // ---------- keys (after the type rules so they win) ----------
  {
    // primary key: bold, darker gray fill, black border
    selector: 'node[key = "PRIMARY_KEY"]',
    style: { 'font-weight': 'bold', 'background-color': '#d4d4d4', 'border-color': '#111111', 'border-width': 2 },
  },
  {
    // partial key: italic, lighter gray fill
    selector: 'node[key = "PARTIAL_KEY"]',
    style: { 'font-style': 'italic', 'background-color': '#f5f5f5', 'border-color': '#111111', 'border-width': 2 },
  },
  {
    // foreign key: no font change, just a heavier border
    selector: 'node[key = "FOREIGN_KEY"]',
    style: { 'border-color': '#111111', 'border-width': 3 },
  },

  // ---------- selection ----------
  { selector: 'node:selected', style: { 'border-color': '#737373', 'border-width': 4 } },
  { selector: 'edge:selected', style: { 'line-color': '#737373' } },
];