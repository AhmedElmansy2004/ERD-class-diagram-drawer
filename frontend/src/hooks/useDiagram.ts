import { useMemo, useState } from "react";
import { mockGraph } from "../mocks/hardcodedGraph";
import { toCytoscapeElements } from "../utils/toCytoscapeElements";
import { mapErdToGraph } from "../utils/erdMapper";
import type { Erdiagram } from "../types/erdiagram";

export function useDiagram() {
    const [graph, setGraph] = useState(mockGraph)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const elements = useMemo(() => toCytoscapeElements(graph), [graph])

    async function generateFromText(description: string){
        setLoading(true)
        setError(null)
        try {
            const response = await fetch("http://localhost:8080/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description }),
            })
            if (!response.ok) {
                const body = await response.json().catch(() => null)
                throw new Error(body?.message ?? `Backend error (${response.status})`)
            }
            const erd = (await response.json()) as Erdiagram
            setGraph(mapErdToGraph(erd))
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Generation failed')
        } finally {
            setLoading(false)
        }
    }

    return {elements, loading, error, setGraph, generateFromText}
}