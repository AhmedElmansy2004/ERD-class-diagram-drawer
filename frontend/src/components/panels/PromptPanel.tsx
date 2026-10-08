import { useState } from 'react'

interface props{
    isLoading :boolean
    onGenerate: (description: string) => void
}

export default function PromptPanel({ isLoading, onGenerate }: props){

    const [text, setText] = useState<string>('');
    const canSubmit = text.trim().length > 0 && !isLoading

    return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Describe your system..."
        style={{ width: '100%' }}
      />
      <button disabled={!canSubmit} onClick={() => onGenerate(text.trim())}>
        {isLoading ? 'Generating...' : 'Generate'}
      </button>
    </div>
  );
}


