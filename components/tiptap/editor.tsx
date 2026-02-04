"use client";

import { cn } from "@/lib/utils";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import { Markdown } from "@tiptap/markdown";
import StarterKit from "@tiptap/starter-kit";
import { Plugin } from "@tiptap/pm/state";
import { Extension } from "@tiptap/core";
import { Image } from "@tiptap/extension-image";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Image as ImageIcon,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Code2,
} from "lucide-react";

const lowlight = createLowlight(common);

const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border border-input bg-muted/20 rounded-t-md">
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-2 hover:bg-input rounded-md disabled:opacity-50"
      >
        <Undo className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-2 hover:bg-input rounded-md disabled:opacity-50"
      >
        <Redo className="h-4 w-4" />
      </button>

      <div className="w-px h-4 bg-border mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(
          "p-2 hover:bg-input rounded-md",
          editor.isActive("heading", { level: 1 }) && "bg-input",
        )}
      >
        <Heading1 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          "p-2 hover:bg-input rounded-md",
          editor.isActive("heading", { level: 2 }) && "bg-input",
        )}
      >
        <Heading2 className="h-4 w-4" />
      </button>

      <div className="w-px h-4 bg-border mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          "p-2 hover:bg-input rounded-md",
          editor.isActive("bold") && "bg-input",
        )}
      >
        <Bold className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          "p-2 hover:bg-input rounded-md",
          editor.isActive("italic") && "bg-input",
        )}
      >
        <Italic className="h-4 w-4" />
      </button>

      <div className="w-px h-4 bg-border mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          "p-2 hover:bg-input rounded-md",
          editor.isActive("bulletList") && "bg-input",
        )}
      >
        <List className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          "p-2 hover:bg-input rounded-md",
          editor.isActive("orderedList") && "bg-input",
        )}
      >
        <ListOrdered className="h-4 w-4" />
      </button>

      <div className="w-px h-4 bg-border mx-1" />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cn(
          "p-2 hover:bg-input rounded-md",
          editor.isActive("blockquote") && "bg-input",
        )}
      >
        <Quote className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn(
          "p-2 hover:bg-input rounded-md",
          editor.isActive("codeBlock") && "bg-input",
        )}
      >
        <Code2 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={addImage}
        className="p-2 hover:bg-input rounded-md"
      >
        <ImageIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

const Tiptap = ({
  content,
  onChange,
  readOnly,
  className,
}: {
  content: string;
  onChange?: (content: string) => void;
  readOnly?: boolean;
  className?: string;
}) => {
  const PasteMarkdown = Extension.create({
    name: "pasteMarkdown",
    addProseMirrorPlugins() {
      const { editor } = this;
      return [
        new Plugin({
          props: {
            handlePaste(view, event) {
              const text = event.clipboardData?.getData("text/plain");

              if (!text) {
                return false;
              }

              // Check if text looks like Markdown
              if (editor.markdown && looksLikeMarkdown(text)) {
                // Parse the Markdown text to Tiptap JSON using the Markdown manager
                const json = editor.markdown.parse(text);

                // Insert the parsed JSON content at cursor position
                editor.commands.insertContent(json);
                return true;
              }

              return false;
            },
          },
        }),
      ];
    },
  });

  function looksLikeMarkdown(text: string): boolean {
    // Simple heuristic: check for Markdown syntax
    return (
      /^#{1,6}\s/.test(text) || // Headings
      /\*\*[^*]+\*\*/.test(text) || // Bold
      /\[.+\]\(.+\)/.test(text) || // Links
      /^[-*+]\s/.test(text)
    ); // Lists
  }

  const editor = useEditor({
    extensions: [
      PasteMarkdown,
      StarterKit.configure({
        codeBlock: false,
      }),
      Markdown.configure({
        markedOptions: { gfm: true },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md max-w-full h-auto mx-auto",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-base max-w-none outline-none min-h-[300px]",
      },
    },
    contentType: "markdown",
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getMarkdown());
    },
    editable: !readOnly,
  });

  return (
    <div className="w-full flex flex-col gap-2">
      {!readOnly && <Toolbar editor={editor} />}
      <div className={cn("rounded-md overflow-hidden", className)}>
        <EditorContent editor={editor} className="max-w-none" />
      </div>
    </div>
  );
};

export default Tiptap;
