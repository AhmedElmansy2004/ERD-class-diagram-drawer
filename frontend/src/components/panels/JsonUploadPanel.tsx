import { useState, type ChangeEvent } from 'react'
import type { Erdiagram } from '../../types/erdiagram';
import { mapErdToGraph } from '../../utils/erdMapper';
import type { GraphResponse } from '../../types/graph';
import './Panels.css';

interface props{
    setGraph: (g: GraphResponse) => void
}

export default function JsonUploadPanel({ setGraph }: props) {

    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    async function handleChange(e: ChangeEvent<HTMLInputElement>){

        const file = e.target.files?.[0]
        if(!file) return

        try{
            const erd = JSON.parse(await file.text()) as Erdiagram
            if (!Array.isArray(erd?.entities) || !Array.isArray(erd?.relationships))
                throw new Error('File must contain "entities" and "relationships" arrays')

            setGraph(mapErdToGraph(erd))
            setFileName(file.name)
            setError(null)
        }
        catch(err){
            setError(err instanceof Error ? err.message : 'Invalid Diagram')
        }
        e.target.value = ''
    }

    return (
        <div>
            <label className="upload">
                <span className="upload__title">Choose JSON file</span>
                <span className="upload__hint">{fileName ?? '.json with entities and relationships'}</span>
                <input className="visually-hidden" type="file"
                       accept=".json,application/json" onChange={handleChange} />
            </label>
            {error && <p className="error" role="alert" style={{ marginTop: 8 }}>{error}</p>}
        </div>
    )
}