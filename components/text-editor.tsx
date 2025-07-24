'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react';

const Tiptap = ({ value, onChange }: { value: string; onChange: (content: string) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // Keep editor content in sync with value prop
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return <EditorContent editor={editor} className="prose prose-neutral dark:prose-invert min-h-40 max-w-none border border-input bg-background rounded-md px-3 py-2 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 transition-colors" />;
}

export default Tiptap