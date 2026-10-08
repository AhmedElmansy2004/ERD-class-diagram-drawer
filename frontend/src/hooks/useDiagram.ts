import { useMemo, useState } from "react";
import { mockGraph } from "../mocks/hardcodedGraph";
import type { GraphResponse } from "../types/graph";
import { toCytoscapeElements } from "../utils/toCytoscapeElements";

function isGraphResponse(value: unknown): value is GraphResponse{
    const v = value as GraphResponse
    return !!v && Array.isArray(v.nodes) && Array.isArray(v.edges)
}

export function useDiagram() {
    const [graph, setGraph] = useState(mockGraph)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const elements = useMemo(() => toCytoscapeElements(graph), [graph])

    function loadFromJSON(json: unknown){
        if(!isGraphResponse(json)){
            setError('File must contain nodes and edges')
            setGraph(mockGraph)
            return
        }
        setError(null)
        setGraph(json)
    }

    function generateFromText(description: string){
        setLoading(true)
        setError(null)
        try{
            console.log(description)
            throw new Error('Backend not connected yet')
        }
        catch (e){
            setError(e instanceof Error ? e.message: 'Something went wrong')
        }
        finally{
            setLoading(false)
        }
    }

    return {elements, loading, error, loadFromJSON, generateFromText}
}