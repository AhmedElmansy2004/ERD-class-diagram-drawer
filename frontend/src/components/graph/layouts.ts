import type cytoscape from 'cytoscape';

export const erLayout = {
  name: 'fcose',
  quality: 'proof',
  randomize: true,
  animate: false,
  nodeRepulsion: 8000,
  idealEdgeLength: 80,
  padding: 30,
} as cytoscape.LayoutOptions;