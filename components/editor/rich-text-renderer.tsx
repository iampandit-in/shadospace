"use client";

import { useEffect } from "react";
import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { cn } from "@/lib/utils";

interface RichTextRendererProps {
  content: JSONContent;
  className?: string;
}

export default function RichTextRenderer({
  content,
  className,
}: RichTextRendererProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        underline: false,
      }),
      Underline,
      Link.configure({
        openOnClick: true,
        autolink: true,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-4 cursor-pointer",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg border border-border shadow-sm",
        },
      }),
    ],
    content,
    editable: false,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-base md:prose-lg dark:prose-invert max-w-none focus:outline-none",
          "prose-h1:text-4xl prose-h1:font-extrabold prose-h1:tracking-tight prose-h1:mb-10",
          "prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4",
          "prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3",
          className,
        ),
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
}
