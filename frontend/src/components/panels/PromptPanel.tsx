import { useState, type KeyboardEvent } from 'react'
import './Panels.css';

interface props{
    isLoading: boolean
    onGenerate: (description: string) => void
}

export default function PromptPanel({ isLoading, onGenerate }: props){

    const [text, setText] = useState<string>('');
    const canSubmit = text.trim().length > 0 && !isLoading

    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && canSubmit)
            onGenerate(text.trim())
    }

    return (
        <div className="prompt">
            <textarea
                className="prompt__input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={6}
                placeholder="Describe your system..."
            />
            <button className="btn btn--primary" disabled={!canSubmit}
                    onClick={() => onGenerate(text.trim())}>
                {isLoading && <span className="spinner" />}
                {isLoading ? 'Generating...' : 'Generate'}
            </button>
            <span className="prompt__hint">Ctrl + Enter to generate</span>
        </div>
    )
}