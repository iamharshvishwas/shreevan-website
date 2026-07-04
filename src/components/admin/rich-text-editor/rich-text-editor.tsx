"use client";

import { useEffect, useRef } from "react";
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

  const editor = useEditor({
    // Required for Next.js SSR: render on the client only, after hydration.
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: false }),
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
    onUpdate: ({ editor: activeEditor }) => {
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
    </div>
  );
}
