import type cytoscape from 'cytoscape';

export const erLayout = {
  name: 'fcose',
  quality: 'proof',
  randomize: true,
  animate: false,
  nodeRepulsion: 15000,
  idealEdgeLength: 120,
  nodeSeparation: 100,
  padding: 40,
} as cytoscape.LayoutOptions;