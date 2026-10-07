import './App.css'
import { mockGraph } from './mocks/hardcodedGraph'
import { toCytoscapeElements } from './utils/toCytoscapeElements'

function App() {

  const elements = toCytoscapeElements(mockGraph);
  console.log(elements)
  console.log(elements.length)

  return (<div>Check the console</div>)
}

export default App
