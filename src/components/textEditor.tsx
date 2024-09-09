import { useRef, useEffect } from "react";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough } from 'react-icons/fa'; // Formatting icons
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from 'react-icons/fa'; // Alignment icons
import { FaListOl, FaListUl } from 'react-icons/fa'; // List icons
import { AiOutlineLink, AiOutlinePicture } from 'react-icons/ai'; // Link and Image icons
import { useTheme } from 'next-themes';

const TextEditor = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value || "");
    handleChange();
  };

  const handleChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const { theme } = useTheme(); // Get the current theme

  const getButtonClassName = () => {
    return `rounded px-3 py-2 bg-bgSecondary ${theme === 'dark' ? 'hover:bg-hover' : 'hover:bg-gray-300'}`;
  };

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className="mx-auto p-4">
      <div className="flex flex-wrap gap-4 space-x-2 rounded-t-md border border-borderPrimary p-2">
        <select
          onChange={e => formatText("formatBlock", e.target.value)}
          className="rounded bg-bgSecondary p-2"
          aria-label="Text format"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>
        <button
          type="button"
          onClick={() => formatText("bold")}
          className={getButtonClassName()}
          aria-label="Bold"
        >
          <FaBold size={20} />
        </button>
        <button
          type="button"
          onClick={() => formatText("italic")}
          className={getButtonClassName()}
          aria-label="Italic"
        >
          <FaItalic size={20} />
        </button>
        <button
          type="button"
          onClick={() => formatText("underline")}
          className={getButtonClassName()}
          aria-label="Underline"
        >
          <FaUnderline size={20} />
        </button>
        <button
          type="button"
          onClick={() => formatText("strikeThrough")}
          className={getButtonClassName()}
          aria-label="Strikethrough"
        >
          <FaStrikethrough size={20} />
        </button>
        <button
          type="button"
          onClick={() => formatText("justifyLeft")}
          className={getButtonClassName()}
          aria-label="Align left"
        >
          <FaAlignLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => formatText("justifyCenter")}
          className={getButtonClassName()}
          aria-label="Align center"
        >
          <FaAlignCenter size={20} />
        </button>
        <button
          type="button"
          onClick={() => formatText("justifyRight")}
          className={getButtonClassName()}
          aria-label="Align right"
        >
          <FaAlignRight size={20} />
        </button>
        <button
          type="button"
          onClick={() => formatText("insertOrderedList")}
          className={getButtonClassName()}
          aria-label="Ordered list"
        >
          <FaListOl size={20} />
        </button>
        <button
          type="button"
          onClick={() => formatText("insertUnorderedList")}
          className={getButtonClassName()}
          aria-label="Unordered list"
        >
          <FaListUl size={20} />
        </button>
        <button
          type="button"
          onClick={() => formatText("createLink", prompt("Enter URL") || "")}
          className={getButtonClassName()}
          aria-label="Insert link"
        >
          <AiOutlineLink size={20} />
        </button>
        <button
          type="button"
          onClick={() =>
            formatText("insertImage", prompt("Enter image URL") || "")
          }
          className={getButtonClassName()}
          aria-label="Insert image"
        >
          <AiOutlinePicture size={20} />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable={true}
        className="min-h-[200px] rounded-b-md border border-borderPrimary p-4 focus:outline-none"
        style={{ whiteSpace: "pre-wrap" }}
        data-placeholder={placeholder || "Start typing..."}
        onInput={handleChange}
        suppressContentEditableWarning={true}
      ></div>
    </div>
  );
};

export default TextEditor;
