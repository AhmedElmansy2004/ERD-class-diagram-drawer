import { useMemo, useState } from "react";
import { mockGraph } from "../mocks/hardcodedGraph";
import { toCytoscapeElements } from "../utils/toCytoscapeElements";

export function useDiagram() {
    const [graph, setGraph] = useState(mockGraph)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const elements = useMemo(() => toCytoscapeElements(graph), [graph])

    async function loadFromJSON(json: unknown){
        
        const response = await fetch("http://localhost:8080/api/diagram", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(json)
                            })

        if(!response.ok){
            console.log('Error loading from backend')
            setError('Error loading from backend')
            setGraph(mockGraph)
            return
        }

        console.log("connection success!!!")

        setError(null)
        setGraph(await response.json())
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