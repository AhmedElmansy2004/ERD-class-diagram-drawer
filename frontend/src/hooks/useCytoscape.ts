import type cytoscape from "cytoscape";
import { useCallback, useEffect, useRef } from "react";
import { downloadDataURI } from "../utils/download";


export function useCytoscape(){

    const cyRef = useRef<cytoscape.Core | null>(null);

    const onReady = useCallback((cy: cytoscape.Core) => {
        cyRef.current = cy
    }, [])

    const exportPng = useCallback((filename = 'ER Diagram') => {
        const cy = cyRef.current

        if(!cy) return

        downloadDataURI(cy.png({ full: true, scale: 2, bg: '#ffffff' }), filename)
    }, [])

    return {onReady, exportPng}
}
