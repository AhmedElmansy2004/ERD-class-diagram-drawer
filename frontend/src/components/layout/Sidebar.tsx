import type { GraphResponse } from "../../types/graph";
import JsonUploadPanel from "../panels/JsonUploadPanel"
import PromptPanel from "../panels/PromptPanel"

interface props{
    loading: boolean
    error: string| null
    exportPng: () => void;
    setGraph: (g: GraphResponse) => void
    generateFromText: (description: string) => void;
}

export default function Sidebar({loading, error, exportPng, setGraph, generateFromText}: props) {
  return (
    <div style={{ borderRight: '1px solid'}}>
      <h2>ER Diagram Generator</h2>
      <button onClick={() => exportPng()}> Download PNG </button>
      <JsonUploadPanel setGraph={setGraph}></JsonUploadPanel>
      <PromptPanel isLoading={loading} onGenerate={generateFromText}></PromptPanel>
      {error && <p style={{color: 'crimson'}}>{error}</p>}
    </div>
  )
}