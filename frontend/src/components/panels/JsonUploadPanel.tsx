import { useState, type ChangeEvent } from 'react'
import type { Erdiagram } from '../../types/erdiagram';
import { mapErdToGraph } from '../../utils/erdMapper';
import type { GraphResponse } from '../../types/graph';

interface props{
    setGraph: (g: GraphResponse) => void
}

export default function JsonUploadPanel({ setGraph }: props) {

    const [error, setError] = useState<string | null>();

    async function handleChange(e: ChangeEvent<HTMLInputElement>){

        const file = e.target.files?.[0]
        if(!file) return

        try{
            const erd = JSON.parse(await file.text()) as Erdiagram
            if (!Array.isArray(erd?.entities) || !Array.isArray(erd?.relationships))
                throw new Error('File must contain "entities" and "relationships" arrays')

            setGraph(mapErdToGraph(erd))
            setError(null)
        }
        catch(err){
            setError(err instanceof Error? err.message: 'Invalid Diagram')
        }
        e.target.value = ''
    }

    return (
        <div>
            <label>
                Choose JSON File 
                <input type="file" accept=".json,application/json" onChange={handleChange}/>  
            </label>
            {error && <p style={{ color: 'crimson'}}> {error} </p>}
        </div>
    )
}

