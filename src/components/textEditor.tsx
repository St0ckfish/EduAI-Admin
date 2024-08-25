import { useRef, useEffect } from 'react';

const TextEditor = ({ value, onChange, placeholder }: { value: string, onChange: (value: string) => void, placeholder: string }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value || '');
    handleChange();
  };

  const handleChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="p-4 mx-auto">
      <div className="border border-gray-300 rounded-t-md p-2 flex flex-wrap gap-4 space-x-2">
        <select
          onChange={(e) => formatText('formatBlock', e.target.value)}
          className="bg-gray-200 p-2 rounded"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>
        <button
          type='button'
          onClick={() => formatText('bold')}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <svg className="h-6 w-6 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M7 5h6a3.5 3.5 0 0 1 0 7h-6z" />
            <path d="M13 12h1a3.5 3.5 0 0 1 0 7h-7v-7" />
          </svg>
        </button>
        <button
          type='button'
          onClick={() => formatText('italic')}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <svg className="h-6 w-6 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="11" y1="5" x2="17" y2="5" />
            <line x1="7" y1="19" x2="13" y2="19" />
            <line x1="14" y1="5" x2="10" y2="19" />
          </svg>
        </button>
        <button
          type='button'
          onClick={() => formatText('underline')}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <svg className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
            <line x1="4" y1="21" x2="20" y2="21" />
          </svg>
        </button>
        <button
          type='button'
          onClick={() => formatText('strikeThrough')}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <svg className="h-6 w-6 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <path d="M16 6.5a4 2 0 0 0 -4 -1.5h-1a3.5 3.5 0 0 0 0 7" />
            <path d="M16.5 16a3.5 3.5 0 0 1 -3.5 3h-1.5a4 2 0 0 1 -4 -1.5" />
          </svg>
        </button>
        <button
          type='button'
          onClick={() => formatText('justifyLeft')}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <svg className="h-6 w-6 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="14" y2="12" />
            <line x1="4" y1="18" x2="18" y2="18" />
          </svg>
        </button>
        <button
          type='button'
          onClick={() => formatText('justifyCenter')}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <svg className="h-6 w-6 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="6" y1="18" x2="18" y2="18" />
          </svg>
        </button>
        <button
          type='button'
          onClick={() => formatText('justifyRight')}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <svg className="h-6 w-6 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="10" y1="12" x2="20" y2="12" />
            <line x1="6" y1="18" x2="20" y2="18" />
          </svg>
        </button>
        <button
          type='button'
          onClick={() => formatText('insertOrderedList')}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </button>
        <button
          type='button'
          onClick={() => formatText('insertUnorderedList')}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <svg className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </button>
        <button
          type='button'
          onClick={() => formatText('createLink', prompt('Enter URL') || '')}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <svg className="h-6 w-6 text-black" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
            <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
          </svg>
        </button>
        <button
          type='button'
          onClick={() => formatText('insertImage', prompt('Enter image URL') || '')}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          <svg className="h-6 w-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable={true}
        className="border border-gray-300 p-4 min-h-[200px] rounded-b-md focus:outline-none"
        style={{ whiteSpace: 'pre-wrap' }}
        data-placeholder={placeholder || 'Start typing...'}
        onInput={handleChange}
        suppressContentEditableWarning={true}
      >
      </div>
    </div>
  );
};

export default TextEditor;
