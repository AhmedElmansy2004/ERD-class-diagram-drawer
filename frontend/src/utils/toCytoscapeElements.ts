import type { ElementDefinition } from "cytoscape";
import type { GraphResponse } from "../types/graph";

export function toCytoscapeElements(graph: GraphResponse): ElementDefinition[]{

    const nodes = graph.nodes.map((n) => ({
        data: {id: n.id, label: n.label, type: n.type, key: n.key},
        position: { x: Math.random() * 600, y: Math.random() * 600 },
    }));

    const edges = graph.edges.map((e) => ({
        data: { id: e.id,
                label: e.label,
                source: e.source,
                target: e.target,
                participation: e.participation
            }
    }));

    return [...nodes, ...edges];
}