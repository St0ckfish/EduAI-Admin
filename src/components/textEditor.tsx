import { useRef, useEffect, useState } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaListOl,
  FaListUl,
} from "react-icons/fa";
import { AiOutlineLink, AiOutlinePicture } from "react-icons/ai";
import { useTheme } from "next-themes";
import { RootState } from "@/GlobalRedux/store";
import { useSelector } from "react-redux";

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
  const [editorIsEmpty, setEditorIsEmpty] = useState(true);
  const { theme } = useTheme();
  const { language: currentLanguage } = useSelector(
    (state: RootState) => state.language,
  );

  // State to keep track of formatting
  const [formattingState, setFormattingState] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikeThrough: false,
    alignLeft: false,
    alignCenter: false,
    alignRight: false,
    orderedList: false,
    unorderedList: false,
  });

  const handleChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);

      // Check if content is empty
      const textContent = editorRef.current.textContent || "";
      setEditorIsEmpty(textContent.trim() === "");
    }
  };

  // Function to wrap selected text with a tag
  const wrapSelectionWithTag = (tagName: string) => {
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      if (
        editorRef.current &&
        editorRef.current.contains(range.commonAncestorContainer)
      ) {
        // Check if the selection is already wrapped with the tag
        const parentElement = selection.anchorNode?.parentElement;
        if (parentElement && parentElement.tagName.toLowerCase() === tagName) {
          // Unwrap it
          const frag = document.createDocumentFragment();
          while (parentElement.firstChild) {
            frag.appendChild(parentElement.firstChild);
          }
          parentElement.parentNode?.replaceChild(frag, parentElement);
        } else {
          // Wrap it
          const newNode = document.createElement(tagName);
          newNode.appendChild(range.extractContents());
          range.insertNode(newNode);
          range.selectNodeContents(newNode);
        }

        selection.removeAllRanges();
        selection.addRange(range);

        handleChange();
        updateFormattingState();
      }
    }
  };

  // Function to apply alignment
  const applyAlignment = (alignment: string) => {
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      if (
        editorRef.current &&
        editorRef.current.contains(range.commonAncestorContainer)
      ) {
        // Find the block element (e.g., <p>, <div>)
        let blockElement = range.commonAncestorContainer as HTMLElement | null;
        while (
          blockElement &&
          !(
            blockElement instanceof HTMLElement &&
            /^(P|DIV|H[1-6]|LI)$/i.exec(blockElement.tagName)
          )
        ) {
          blockElement = blockElement.parentElement;
        }

        if (blockElement instanceof HTMLElement) {
          blockElement.style.textAlign = alignment;
          handleChange();
          updateFormattingState();
        }
      }
    }
  };

  // Function to toggle list
  const toggleList = (listType: "ol" | "ul") => {
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      if (
        editorRef.current &&
        editorRef.current.contains(range.commonAncestorContainer)
      ) {
        let listElement = range.commonAncestorContainer as HTMLElement | null;
        while (
          listElement &&
          !(
            listElement instanceof HTMLElement &&
            (listElement.tagName.toLowerCase() === "ol" ||
              listElement.tagName.toLowerCase() === "ul")
          )
        ) {
          listElement = listElement.parentElement;
        }

        if (
          listElement &&
          listElement instanceof HTMLElement &&
          listElement.tagName.toLowerCase() === listType
        ) {
          // Unwrap list
          const frag = document.createDocumentFragment();
          while (listElement.firstChild) {
            frag.appendChild(listElement.firstChild);
          }
          listElement.parentNode?.replaceChild(frag, listElement);
        } else {
          // Wrap selection in list
          const list = document.createElement(listType);
          const li = document.createElement("li");
          li.appendChild(range.extractContents());
          list.appendChild(li);
          range.insertNode(list);
          range.selectNodeContents(list);
        }

        selection.removeAllRanges();
        selection.addRange(range);

        handleChange();
        updateFormattingState();
      }
    }
  };

  // Function to create link
  const createLink = (url: string) => {
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      if (
        editorRef.current &&
        editorRef.current.contains(range.commonAncestorContainer)
      ) {
        const anchor = document.createElement("a");
        anchor.setAttribute("href", url);
        anchor.appendChild(range.extractContents());
        range.insertNode(anchor);
        range.selectNodeContents(anchor);

        selection.removeAllRanges();
        selection.addRange(range);

        handleChange();
      }
    }
  };

  // Function to insert image
  const insertImage = (url: string) => {
    const img = document.createElement("img");
    img.setAttribute("src", url);

    if (editorRef.current) {
      const selection = window.getSelection();

      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        if (editorRef.current.contains(range.commonAncestorContainer)) {
          range.insertNode(img);
          range.setStartAfter(img);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        editorRef.current.appendChild(img);
      }

      handleChange();
    }
  };

  // Function to update formatting state
  const updateFormattingState = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      let isBold = false;
      let isItalic = false;
      let isUnderline = false;
      let isStrikeThrough = false;
      let isAlignLeft = false;
      let isAlignCenter = false;
      let isAlignRight = false;
      let isOrderedList = false;
      let isUnorderedList = false;

      const anchorNode = selection.anchorNode;
      if (anchorNode) {
        let currentNode: Node | null = anchorNode;
        while (currentNode && currentNode !== editorRef.current) {
          if (currentNode.nodeType === Node.ELEMENT_NODE) {
            const element = currentNode as HTMLElement;
            const tagName = element.tagName.toLowerCase();
            const style = element.style;

            if (tagName === "strong") {
              isBold = true;
            }
            if (tagName === "em") {
              isItalic = true;
            }
            if (tagName === "u") {
              isUnderline = true;
            }
            if (tagName === "s" || tagName === "strike") {
              isStrikeThrough = true;
            }
            if (style.textAlign === "left") {
              isAlignLeft = true;
            }
            if (style.textAlign === "center") {
              isAlignCenter = true;
            }
            if (style.textAlign === "right") {
              isAlignRight = true;
            }
            if (tagName === "ol") {
              isOrderedList = true;
            }
            if (tagName === "ul") {
              isUnorderedList = true;
            }
          }
          currentNode = currentNode.parentNode;
        }
      }
      setFormattingState({
        bold: isBold,
        italic: isItalic,
        underline: isUnderline,
        strikeThrough: isStrikeThrough,
        alignLeft: isAlignLeft,
        alignCenter: isAlignCenter,
        alignRight: isAlignRight,
        orderedList: isOrderedList,
        unorderedList: isUnorderedList,
      });
    }
  };

  const getButtonClassName = (isActive: boolean) => {
    return `rounded px-3 py-2 ${
      isActive ? "bg-blue-500 text-white" : ""
    } ${theme === "dark" ? "hover:bg-hover" : "hover:bg-hover hover:text-[#ffffff]"}`;
  };

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
      const textContent = editorRef.current.textContent || "";
      setEditorIsEmpty(textContent.trim() === "");
    }
  }, [value]);

  useEffect(() => {
    const handleSelectionChange = () => {
      if (
        editorRef.current &&
        editorRef.current.contains(window.getSelection()?.anchorNode ?? null)
      ) {
        updateFormattingState();
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <div className="mx-auto p-4">
      <div className="flex flex-wrap gap-4 space-x-2 rounded-t-md border border-borderPrimary p-2">
        <select
          onChange={e => wrapSelectionWithTag(e.target.value)}
          className="rounded p-2 outline-none"
          aria-label="Text format"
        >
          <option value="p">
            {currentLanguage === "en"
              ? "Paragraph"
              : currentLanguage === "ar"
                ? "فقرة"
                : "Paragraphe"}
          </option>
          <option value="h1">
            {currentLanguage === "en"
              ? "Heading 1"
              : currentLanguage === "ar"
                ? "العنوان 1"
                : "Titre 1"}
          </option>
          <option value="h2">
            {currentLanguage === "en"
              ? "Heading 2"
              : currentLanguage === "ar"
                ? "العنوان 2"
                : "Titre 2"}
          </option>
          <option value="h3">
            {currentLanguage === "en"
              ? "Heading 3"
              : currentLanguage === "ar"
                ? "العنوان 3"
                : "Titre 3"}
          </option>
        </select>
        <button
          type="button"
          onClick={() => wrapSelectionWithTag("strong")}
          className={getButtonClassName(formattingState.bold)}
          aria-label="Bold"
        >
          <FaBold size={20} />
        </button>
        <button
          type="button"
          onClick={() => wrapSelectionWithTag("em")}
          className={getButtonClassName(formattingState.italic)}
          aria-label="Italic"
        >
          <FaItalic size={20} />
        </button>
        <button
          type="button"
          onClick={() => wrapSelectionWithTag("u")}
          className={getButtonClassName(formattingState.underline)}
          aria-label="Underline"
        >
          <FaUnderline size={20} />
        </button>
        <button
          type="button"
          onClick={() => wrapSelectionWithTag("s")}
          className={getButtonClassName(formattingState.strikeThrough)}
          aria-label="Strikethrough"
        >
          <FaStrikethrough size={20} />
        </button>
        <button
          type="button"
          onClick={() => applyAlignment("left")}
          className={getButtonClassName(formattingState.alignLeft)}
          aria-label="Align left"
        >
          <FaAlignLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => applyAlignment("center")}
          className={getButtonClassName(formattingState.alignCenter)}
          aria-label="Align center"
        >
          <FaAlignCenter size={20} />
        </button>
        <button
          type="button"
          onClick={() => applyAlignment("right")}
          className={getButtonClassName(formattingState.alignRight)}
          aria-label="Align right"
        >
          <FaAlignRight size={20} />
        </button>
        <button
          type="button"
          onClick={() => toggleList("ol")}
          className={getButtonClassName(formattingState.orderedList)}
          aria-label="Ordered list"
        >
          <FaListOl size={20} />
        </button>
        <button
          type="button"
          onClick={() => toggleList("ul")}
          className={getButtonClassName(formattingState.unorderedList)}
          aria-label="Unordered list"
        >
          <FaListUl size={20} />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter URL") || "";
            if (url) {
              createLink(url);
            }
          }}
          className={getButtonClassName(false)}
          aria-label="Insert link"
        >
          <AiOutlineLink size={20} />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter image URL") || "";
            if (url) {
              insertImage(url);
            }
          }}
          className={getButtonClassName(false)}
          aria-label="Insert image"
        >
          <AiOutlinePicture size={20} />
        </button>
      </div>
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable={true}
          className="min-h-[200px] cursor-text rounded-b-md border border-borderPrimary p-4 focus:outline-none"
          style={{ whiteSpace: "pre-wrap" }}
          onInput={handleChange}
          suppressContentEditableWarning={true}
        ></div>
        {editorIsEmpty && (
          <div className="pointer-events-none absolute left-0 top-0 p-4 text-gray-400">
            {placeholder || "Start typing..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextEditor;
