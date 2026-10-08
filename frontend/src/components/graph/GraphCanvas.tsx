import cytoscape from "cytoscape";
import fcose from "cytoscape-fcose";
import { useEffect, useRef } from "react";
import { graphStyles } from "./graphStyles";
import { erLayout } from "./layouts";

cytoscape.use(fcose);

interface props{
    elements: cytoscape.ElementDefinition[];
    onReady?: (cy: cytoscape.Core) => void;
}

export default function GraphCanvas({elements, onReady}: props){
    
    const containerRef = useRef<HTMLDivElement>(null)
    const cyRef = useRef<cytoscape.Core| null>(null)

    useEffect(() => {
        const cy = cytoscape({container: containerRef.current, style: graphStyles})
        cyRef.current = cy
        
        if(onReady)
            onReady(cy)

        return () => cy.destroy()
    }, [])

    useEffect(() => {
        const cy = cyRef.current
        if(!cy) return

        cy.elements().remove()
        cy.add(elements)
        cy.layout(erLayout).run()

    }, [elements])

    return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />
}