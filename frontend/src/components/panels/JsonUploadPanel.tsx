import { useState, type ChangeEvent } from 'react'

interface props{
    onUpload: (json: unknown) => void
}

export default function JsonUploadPanel({ onUpload }: props) {

    const [error, setError] = useState<string | null>();

    async function handleChange(e: ChangeEvent<HTMLInputElement>){

        const file = e.target.files?.[0]
        if(!file) return

        try{
            const parsed = JSON.parse(await file.text())
            setError(null)
            onUpload(parsed)
        }
        catch{
            setError("File parsed is not a valid JSON")
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

