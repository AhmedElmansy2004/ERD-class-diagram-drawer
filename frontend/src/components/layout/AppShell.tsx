import Sidebar from './Sidebar';
import GraphCanvas from '../graph/GraphCanvas';
import { useCytoscape } from '../../hooks/useCytoscape';
import { useDiagram } from '../../hooks/useDiagram';

export default function AppShell() {
    const {onReady, exportPng} = useCytoscape()

    const {elements, loading, error, setGraph, generateFromText} = useDiagram()

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar loading={loading} 
            error={error} 
            exportPng={exportPng} 
            setGraph={setGraph} 
            generateFromText={generateFromText}/>
            <GraphCanvas elements={elements} onReady={onReady}></GraphCanvas>
        </div>
    );
}