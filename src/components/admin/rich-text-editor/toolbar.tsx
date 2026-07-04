"use client";

import { ChangeEvent, MouseEvent, useRef } from "react";
import type { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Baseline,
  Bold,
  Code,
  Highlighter,
  Image as ImageIcon,
  IndentDecrease,
  IndentIncrease,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Omega,
  Plus,
  Quote,
  Redo,
  Strikethrough,
  Table as TableIcon,
  Trash2,
  Undo,
  Unlink,
  Upload,
} from "lucide-react";
import { ToolbarButton } from "./toolbar-button";

const FONT_FAMILIES = [
  { label: "Default", value: "" },
  { label: "Site body", value: "var(--font-body)" },
  { label: "Site heading", value: "var(--font-heading)" },
  { label: "Serif", value: "Georgia, 'Times New Roman', serif" },
  { label: "Mono", value: "ui-monospace, SFMono-Regular, Menlo, monospace" },
  { label: "Arial", value: "Arial, sans-serif" },
];

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "30px", "36px", "48px"];

const TEXT_COLORS = [
  "#000000", "#374151", "#6b7280", "#173d32", "#315a49", "#96722c",
  "#a95f45", "#ef4444", "#3b82f6", "#22c55e", "#8b5cf6",
];

const HIGHLIGHT_COLORS = ["#fef08a", "#fecaca", "#fed7aa", "#bbf7d0", "#bae6fd", "#ddd6fe", "#fbcfe8"];

const SYMBOLS = [
  "©", "®", "™", "§", "•", "…", "–", "—", "°", "±", "×", "÷", "≈", "≠", "≤", "≥",
  "→", "←", "↑", "↓", "↔", "∞", "√", "µ", "π", "Ω", "€", "£", "¥", "₹", "✓", "✗",
  "★", "☆", "♥", "“", "”", "‘", "’", "«", "»",
];

function closePopover(event: MouseEvent) {
  (event.currentTarget as HTMLElement).closest("details")?.removeAttribute("open");
}

export function Toolbar({
  editor,
  onUploadImage,
}: Readonly<{
  editor: Editor | null;
  onUploadImage?: (file: File) => Promise<string | null>;
}>) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", previousUrl || "https://");

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImageUrl = () => {
    const url = window.prompt("Enter image URL");

    if (!url) {
      return;
    }

    editor.chain().focus().setImage({ src: url }).run();
  };

  const handleImageFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (onUploadImage) {
      const src = await onUploadImage(file);

      if (src) {
        editor.chain().focus().setImage({ src }).run();
      }

      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const src = loadEvent.target?.result as string;

      if (src) {
        editor.chain().focus().setImage({ src }).run();
      }
    };
    reader.readAsDataURL(file);
  };

  const currentHeading = (() => {
    for (const level of [2, 3, 4] as const) {
      if (editor.isActive("heading", { level })) {
        return `h${level}`;
      }
    }

    return "p";
  })();

  const currentFont =
    FONT_FAMILIES.find((font) => font.value && editor.isActive("textStyle", { fontFamily: font.value }))?.value ?? "";
  const currentSize = (editor.getAttributes("textStyle").fontSize as string | undefined) ?? "";

  const selectedNode = (editor.state.selection as { node?: { type: { name: string } } }).node;
  const imageSelected = Boolean(selectedNode && /image/i.test(selectedNode.type.name));

  const setImageStyle = (style: string) => {
    editor
      .chain()
      .focus()
      .updateAttributes("imageResize", { style })
      .updateAttributes("image", { style })
      .run();
  };

  return (
    <div className="admin-rte-toolbar" role="toolbar" aria-label="Text formatting">
      <select
        className="admin-rte-select"
        aria-label="Paragraph style"
        value={currentHeading}
        onChange={(event) => {
          const value = event.target.value;

          if (value === "p") {
            editor.chain().focus().setParagraph().run();
          } else {
            editor
              .chain()
              .focus()
              .toggleHeading({ level: parseInt(value.slice(1), 10) as 2 | 3 | 4 })
              .run();
          }
        }}
      >
        <option value="p">Paragraph</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
        <option value="h4">Heading 4</option>
      </select>

      <select
        className="admin-rte-select"
        aria-label="Font family"
        value={currentFont}
        onChange={(event) => {
          const value = event.target.value;

          if (!value) {
            editor.chain().focus().unsetFontFamily().run();
          } else {
            editor.chain().focus().setFontFamily(value).run();
          }
        }}
      >
        {FONT_FAMILIES.map((font) => (
          <option key={font.label} value={font.value}>
            {font.label}
          </option>
        ))}
      </select>

      <select
        className="admin-rte-select admin-rte-select-narrow"
        aria-label="Font size"
        value={currentSize}
        onChange={(event) => {
          const value = event.target.value;

          if (!value) {
            editor.chain().focus().unsetFontSize().run();
          } else {
            editor.chain().focus().setFontSize(value).run();
          }
        }}
      >
        <option value="">Size</option>
        {FONT_SIZES.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <span className="admin-rte-sep" aria-hidden="true" />

      <ToolbarButton icon={Bold} title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} />
      <ToolbarButton icon={Italic} title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} />
      <ToolbarButton
        icon={Strikethrough}
        title="Strikethrough"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
      />

      <details className="admin-rte-pop">
        <summary title="Text color">
          <Baseline size={16} style={{ color: (editor.getAttributes("textStyle").color as string | undefined) || undefined }} />
        </summary>
        <div className="admin-rte-pop-body admin-rte-swatch-grid">
          {TEXT_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className="admin-rte-swatch"
              style={{ backgroundColor: color }}
              title={color}
              onClick={(event) => {
                editor.chain().focus().setColor(color).run();
                closePopover(event);
              }}
            />
          ))}
          <button
            type="button"
            className="admin-rte-pop-clear"
            onClick={(event) => {
              editor.chain().focus().unsetColor().run();
              closePopover(event);
            }}
          >
            Remove color
          </button>
        </div>
      </details>

      <details className="admin-rte-pop">
        <summary title="Highlight">
          <Highlighter size={16} />
        </summary>
        <div className="admin-rte-pop-body admin-rte-swatch-grid">
          {HIGHLIGHT_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className="admin-rte-swatch"
              style={{ backgroundColor: color }}
              title={color}
              onClick={(event) => {
                editor.chain().focus().toggleHighlight({ color }).run();
                closePopover(event);
              }}
            />
          ))}
          <button
            type="button"
            className="admin-rte-pop-clear"
            onClick={(event) => {
              editor.chain().focus().unsetHighlight().run();
              closePopover(event);
            }}
          >
            Remove highlight
          </button>
        </div>
      </details>

      <span className="admin-rte-sep" aria-hidden="true" />

      <ToolbarButton icon={AlignLeft} title="Align left" onClick={() => editor.chain().focus().setTextAlign("left").run()} isActive={editor.isActive({ textAlign: "left" })} />
      <ToolbarButton icon={AlignCenter} title="Align center" onClick={() => editor.chain().focus().setTextAlign("center").run()} isActive={editor.isActive({ textAlign: "center" })} />
      <ToolbarButton icon={AlignRight} title="Align right" onClick={() => editor.chain().focus().setTextAlign("right").run()} isActive={editor.isActive({ textAlign: "right" })} />
      <ToolbarButton icon={AlignJustify} title="Justify" onClick={() => editor.chain().focus().setTextAlign("justify").run()} isActive={editor.isActive({ textAlign: "justify" })} />
      <ToolbarButton icon={IndentDecrease} title="Decrease indent" onClick={() => editor.chain().focus().outdent().run()} />
      <ToolbarButton icon={IndentIncrease} title="Increase indent" onClick={() => editor.chain().focus().indent().run()} />

      <span className="admin-rte-sep" aria-hidden="true" />

      <ToolbarButton icon={List} title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} />
      <ToolbarButton icon={ListOrdered} title="Ordered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} />
      <ToolbarButton icon={Quote} title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive("blockquote")} />
      <ToolbarButton icon={Code} title="Code block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive("codeBlock")} />

      <span className="admin-rte-sep" aria-hidden="true" />

      <ToolbarButton icon={LinkIcon} title="Add link" onClick={addLink} isActive={editor.isActive("link")} />
      <ToolbarButton icon={Unlink} title="Remove link" onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive("link")} />
      <ToolbarButton icon={ImageIcon} title="Image by URL" onClick={addImageUrl} />
      <ToolbarButton icon={Upload} title="Upload image" onClick={() => fileInputRef.current?.click()} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="admin-rte-hidden-input"
        onChange={(event) => void handleImageFile(event)}
      />
      <ToolbarButton
        icon={AlignLeft}
        title="Float image left (wrap text right)"
        onClick={() => setImageStyle("float: left; margin: 0.25rem 1rem 0.5rem 0;")}
        disabled={!imageSelected}
      />
      <ToolbarButton
        icon={AlignCenter}
        title="Center image"
        onClick={() => setImageStyle("display: block; margin: 0.5rem auto;")}
        disabled={!imageSelected}
      />
      <ToolbarButton
        icon={AlignRight}
        title="Float image right (wrap text left)"
        onClick={() => setImageStyle("float: right; margin: 0.25rem 0 0.5rem 1rem;")}
        disabled={!imageSelected}
      />

      <span className="admin-rte-sep" aria-hidden="true" />

      <details className="admin-rte-pop">
        <summary title="Table">
          <TableIcon size={16} />
        </summary>
        <div className="admin-rte-pop-body admin-rte-menu">
          <button
            type="button"
            onClick={(event) => {
              editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
              closePopover(event);
            }}
          >
            <Plus size={14} /> Insert table (3×3)
          </button>
          <button type="button" disabled={!editor.can().addRowAfter()} onClick={(event) => { editor.chain().focus().addRowAfter().run(); closePopover(event); }}>
            <Plus size={14} /> Add row
          </button>
          <button type="button" disabled={!editor.can().addColumnAfter()} onClick={(event) => { editor.chain().focus().addColumnAfter().run(); closePopover(event); }}>
            <Plus size={14} /> Add column
          </button>
          <button type="button" disabled={!editor.can().deleteRow()} onClick={(event) => { editor.chain().focus().deleteRow().run(); closePopover(event); }}>
            <Minus size={14} /> Delete row
          </button>
          <button type="button" disabled={!editor.can().deleteColumn()} onClick={(event) => { editor.chain().focus().deleteColumn().run(); closePopover(event); }}>
            <Minus size={14} /> Delete column
          </button>
          <button type="button" disabled={!editor.can().toggleHeaderRow()} onClick={(event) => { editor.chain().focus().toggleHeaderRow().run(); closePopover(event); }}>
            Toggle header row
          </button>
          <button type="button" disabled={!editor.can().deleteTable()} onClick={(event) => { editor.chain().focus().deleteTable().run(); closePopover(event); }}>
            <Trash2 size={14} /> Delete table
          </button>
        </div>
      </details>

      <details className="admin-rte-pop">
        <summary title="Insert symbol">
          <Omega size={16} />
        </summary>
        <div className="admin-rte-pop-body admin-rte-symbol-grid">
          {SYMBOLS.map((symbol) => (
            <button
              key={symbol}
              type="button"
              onClick={(event) => {
                editor.chain().focus().insertContent(symbol).run();
                closePopover(event);
              }}
            >
              {symbol}
            </button>
          ))}
        </div>
      </details>

      <span className="admin-rte-sep" aria-hidden="true" />

      <ToolbarButton icon={Undo} title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} />
      <ToolbarButton icon={Redo} title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} />
    </div>
  );
}
