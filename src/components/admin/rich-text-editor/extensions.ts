import { Extension } from "@tiptap/core";
import type { Transaction } from "@tiptap/pm/state";
import type { EditorState } from "@tiptap/pm/state";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";

// Ported from the Lovable "React Text Builder" export. FontSize stores an
// inline font-size on the textStyle mark; Indent shifts paragraphs/headings
// with margin-left steps.

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
    indent: {
      indent: () => ReturnType;
      outdent: () => ReturnType;
    };
  }
}

export const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return { types: ["textStyle"] };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (el) => (el as HTMLElement).style.fontSize || null,
            renderHTML: (attrs) => (attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {}),
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (size) =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontSize: size }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run(),
    };
  },
});

const INDENT_TYPES = ["paragraph", "heading"];
const MAX_INDENT = 8;
const STEP = 24;

export const Indent = Extension.create({
  name: "indent",
  addGlobalAttributes() {
    return [
      {
        types: INDENT_TYPES,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (el) => {
              const value = parseInt((el as HTMLElement).style.marginLeft || "0", 10);

              return value ? Math.round(value / STEP) : 0;
            },
            renderHTML: (attrs) => (attrs.indent ? { style: `margin-left: ${attrs.indent * STEP}px` } : {}),
          },
        },
      },
    ];
  },
  addCommands() {
    const update =
      (delta: number) =>
      ({ state, tr, dispatch }: { state: EditorState; tr: Transaction; dispatch?: (tr: Transaction) => void }) => {
        const { from, to } = state.selection;
        let changed = false;

        state.doc.nodesBetween(from, to, (node: ProseMirrorNode, pos: number) => {
          if (INDENT_TYPES.includes(node.type.name)) {
            const current = (node.attrs.indent as number) || 0;
            const next = Math.max(0, Math.min(MAX_INDENT, current + delta));

            if (next !== current) {
              tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: next });
              changed = true;
            }
          }
        });

        if (changed && dispatch) {
          dispatch(tr);
        }

        return changed;
      };

    return {
      indent: () => update(1),
      outdent: () => update(-1),
    };
  },
});
