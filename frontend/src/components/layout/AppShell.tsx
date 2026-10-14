import Sidebar from './Sidebar';
import GraphCanvas from '../graph/GraphCanvas';
import { useCytoscape } from '../../hooks/useCytoscape';
import { useDiagram } from '../../hooks/useDiagram';
import './Layout.css';

export default function AppShell() {
    const {onReady, exportPng} = useCytoscape()
    const {elements, loading, error, setGraph, generateFromText} = useDiagram()

    return (
        <div className="app">
            <Sidebar loading={loading}
                error={error}
                exportPng={exportPng}
                setGraph={setGraph}
                generateFromText={generateFromText}/>
            <main className="canvas">
                <GraphCanvas elements={elements} onReady={onReady} />
            </main>
        </div>
    );
}