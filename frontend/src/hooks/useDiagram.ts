import { useMemo, useState } from "react";
import { mockGraph } from "../mocks/hardcodedGraph";
import { toCytoscapeElements } from "../utils/toCytoscapeElements";

export function useDiagram() {
    const [graph, setGraph] = useState(mockGraph)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const elements = useMemo(() => toCytoscapeElements(graph), [graph])

    async function generateFromText(description: string){
        setLoading(true)
        try {
            const response = await fetch("http://localhost:8080/api/generate",{
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({description})
                                }
            )
            if (!response.ok) { setError('Error loading from backend'); return }
            setGraph(await response.json())
        } catch {
            setError('Could not reach the backend')
        } finally {
            setLoading(false)
        }
    }

    return {elements, loading, error, setGraph, generateFromText}
}