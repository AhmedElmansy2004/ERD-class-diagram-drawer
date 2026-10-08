import { use, useEffect } from 'react';
import './App.css'
import GraphCanvas from './components/graph/GraphCanvas';
import { mockGraph } from './mocks/hardcodedGraph'
import { toCytoscapeElements } from './utils/toCytoscapeElements'
import { useCytoscape } from './hooks/useCytoscape';



function App() {

  const elements = toCytoscapeElements(mockGraph);
  console.log(elements)
  console.log(elements.length)

  const {onReady, exportPng} = useCytoscape()

  return <>
            <button onClick={() => exportPng('ER Diagram')}>Export PNG</button>
            <GraphCanvas elements={elements} onReady={onReady}/>
          </>
   

}

export default App
