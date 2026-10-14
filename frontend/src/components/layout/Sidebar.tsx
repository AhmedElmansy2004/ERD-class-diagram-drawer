import type { GraphResponse } from "../../types/graph";
import JsonUploadPanel from "../panels/JsonUploadPanel"
import PromptPanel from "../panels/PromptPanel"
import './Layout.css';

interface props{
    loading: boolean
    error: string | null
    exportPng: () => void
    setGraph: (g: GraphResponse) => void
    generateFromText: (description: string) => void
}

export default function Sidebar({loading, error, exportPng, setGraph, generateFromText}: props) {
  return (
    <aside className="sidebar">
      <header>
        <h1 className="sidebar__title">ER Diagram Generator</h1>
        <p className="sidebar__subtitle">Import a JSON file or describe a system.</p>
      </header>

      <section className="section">
        <h2 className="section__label">Import</h2>
        <JsonUploadPanel setGraph={setGraph} />
      </section>

      <section className="section">
        <h2 className="section__label">Generate with AI</h2>
        <PromptPanel isLoading={loading} onGenerate={generateFromText} />
      </section>

      {error && <p className="error" role="alert">{error}</p>}

      <footer className="sidebar__footer">
        <button className="btn btn--ghost" onClick={() => exportPng()}>Download PNG</button>
      </footer>
    </aside>
  )
}