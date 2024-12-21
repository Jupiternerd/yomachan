"use client";

import { type Editor } from '@tiptap/react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Undo, Redo } from 'lucide-react';
import { type FC, type ButtonHTMLAttributes } from 'react';

interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  children: React.ReactNode;
}

const ToolbarButton: FC<ToolbarButtonProps> = ({ 
  isActive, 
  children, 
  className = '', 
  ...props 
}) => {
  return (
    <button
      className={`p-2 rounded hover:bg-secondary transition-colors ${
        isActive ? 'bg-secondary' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface MenuBarProps {
  editor: Editor | null;
}

const MenuBar: FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex gap-2 p-2 border-b border-border">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      
      <div className="border-l border-border mx-2" />
      
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="disabled:opacity-50"
      >
        <Undo className="h-4 w-4" />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="disabled:opacity-50"
      >
        <Redo className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
};

interface TiptapEditorProps {
  initialContent?: string;
  onUpdate?: (html: string) => void;
  className?: string;
}

export default function TiptapEditor({ 
  initialContent = '<p>Start typing...</p>', 
  onUpdate,
  className = ''
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none text-black',
      },
    },
    onUpdate: ({ editor }) => {
      onUpdate?.(editor.getHTML());
    },
  });

  return (
    <div className={`w-full border rounded-lg overflow-hidden ${className}`}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="min-h-[200px] p-4" />
    </div>
  );
}