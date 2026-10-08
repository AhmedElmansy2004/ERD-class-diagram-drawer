import './App.css'
import GraphCanvas from './components/graph/GraphCanvas';
import { mockGraph } from './mocks/hardcodedGraph'
import { toCytoscapeElements } from './utils/toCytoscapeElements'

function App() {

  const elements = toCytoscapeElements(mockGraph);
  console.log(elements)
  console.log(elements.length)

  return <GraphCanvas elements={elements}/>
}

export default App
