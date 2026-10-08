import Sidebar from './Sidebar';
import GraphCanvas from '../graph/GraphCanvas';
import { useCytoscape } from '../../hooks/useCytoscape';
import { useDiagram } from '../../hooks/useDiagram';

export default function AppShell() {
    const {onReady, exportPng} = useCytoscape()

    const {elements, loading, error, loadFromJSON, generateFromText} = useDiagram()

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar loading={loading} 
            error={error} 
            exportPng={exportPng} 
            loadFromJson={loadFromJSON} 
            generateFromText={generateFromText}/>
            <GraphCanvas elements={elements} onReady={onReady}></GraphCanvas>
        </div>
    );
}