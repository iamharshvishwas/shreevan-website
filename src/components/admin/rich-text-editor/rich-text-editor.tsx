"use client";

import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { ImageResize } from "tiptap-extension-resize-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { Highlight } from "@tiptap/extension-highlight";
import { TextAlign } from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { FontSize, Indent } from "./extensions";
import { Toolbar } from "./toolbar";

const CHANGE_DEBOUNCE_MS = 300;
const AVERAGE_READING_WPM = 220;

export function countWords(text: string) {
  const trimmed = text.trim();

  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export function readTimeLabel(words: number) {
  return `${Math.max(1, Math.round(words / AVERAGE_READING_WPM))} min read`;
}

// TipTap editor ported from the Lovable "React Text Builder" export, adapted
// to a controlled component: the blog panel owns the HTML value and saving.
export function RichTextEditor({
  documentKey,
  value,
  onChange,
  onUploadImage,
}: Readonly<{
  documentKey: string;
  value: string;
  onChange: (html: string) => void;
  onUploadImage?: (file: File) => Promise<string | null>;
}>) {
  const changeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastEmittedHtmlRef = useRef(value);
  const [stats, setStats] = useState(() => ({ words: 0, characters: 0 }));

  const editor = useEditor({
    // Required for Next.js SSR: render on the client only, after hydration.
    immediatelyRender: false,
    extensions: [
      // The article page already renders the post title as the page H1, so
      // content headings are restricted to H2-H4 to avoid duplicate H1s.
      StarterKit.configure({ link: false, heading: { levels: [2, 3, 4] } }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      ImageResize.configure({ allowBase64: true, inline: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TextStyle,
      Color,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      FontSize,
      Indent,
    ],
    content: value || "<p></p>",
    onCreate: ({ editor: activeEditor }) => {
      const text = activeEditor.getText();

      setStats({ words: countWords(text), characters: text.length });
    },
    onUpdate: ({ editor: activeEditor }) => {
      const text = activeEditor.getText();

      setStats({ words: countWords(text), characters: text.length });

      if (changeTimeoutRef.current) {
        clearTimeout(changeTimeoutRef.current);
      }

      changeTimeoutRef.current = setTimeout(() => {
        const html = activeEditor.getHTML();

        lastEmittedHtmlRef.current = html;
        onChange(html);
      }, CHANGE_DEBOUNCE_MS);
    },
    editorProps: {
      attributes: {
        class: "admin-rte-content",
      },
    },
  });

  // Load the right document when the admin switches between blog posts, or
  // when a save/revert replaces the value from outside the editor.
  useEffect(() => {
    if (!editor) {
      return;
    }

    if (value !== lastEmittedHtmlRef.current) {
      lastEmittedHtmlRef.current = value;
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
    }
    // documentKey intentionally included: switching articles must always reload content.
  }, [editor, value, documentKey]);

  useEffect(() => {
    return () => {
      if (changeTimeoutRef.current) {
        clearTimeout(changeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="admin-rte">
      <Toolbar editor={editor} onUploadImage={onUploadImage} />
      <div className="admin-rte-page">
        <EditorContent editor={editor} />
      </div>
      <footer className="admin-rte-footer" aria-live="polite">
        <span>{stats.words} words</span>
        <span>{stats.characters} characters</span>
        <span>{readTimeLabel(stats.words)}</span>
      </footer>
    </div>
  );
}
