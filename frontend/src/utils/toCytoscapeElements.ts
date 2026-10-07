import type { ElementDefinition } from "cytoscape";
import type { GraphResponse } from "../types/graph";

export function toCytoscapeElements(graph: GraphResponse): ElementDefinition[]{

    const nodes = graph.nodes.map((n) => ({
        data: {id: n.id, label: n.label, type: n.type}
    }));

    const edges = graph.edges.map((e) => ({
        data: { id: e.id,
                label: e.label,
                source: e.source,
                target: e.target,
                type: e.type,
                participation: e.participation
            }
    }));

    return [...nodes, ...edges];
}