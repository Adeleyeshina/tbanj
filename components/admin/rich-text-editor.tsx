'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
    Heading2,
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Minus,
    Undo2,
    Redo2,
    Pilcrow,
} from 'lucide-react'
import { cn } from '@/utils/cn'

interface RichTextEditorProps {
    value: string
    onChange: (html: string) => void
    label?: string
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, label }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value || '',
        immediatelyRender: false,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class:
                    'prose-sm max-w-none min-h-[180px] focus:outline-none px-4 py-3 text-sm sm:text-base text-neutral-800',
            },
        },
    })

    const toolbarBtn = (active: boolean) =>
        cn(
            'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
            active
                ? 'bg-brand-primary text-white'
                : 'text-neutral-600 hover:bg-neutral-100'
        )

    return (
        <div>
            {label && (
                <label className="block font-bold text-neutral-700 uppercase tracking-wider mb-1.5 text-xs">
                    {label}
                </label>
            )}

            <div className="rounded-2xl border border-neutral-200 overflow-hidden focus-within:border-brand-primary transition-colors bg-white">
                {/* Toolbar */}
                <div className="flex items-center gap-1 p-2 border-b border-neutral-200 bg-neutral-50 overflow-x-auto">
                    <button
                        type="button"
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={toolbarBtn(editor?.isActive('heading', { level: 2 }) ?? false)}
                        title="Heading"
                    >
                        <Heading2 className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        className={toolbarBtn(editor?.isActive('bold') ?? false)}
                        title="Bold"
                    >
                        <Bold className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        className={toolbarBtn(editor?.isActive('italic') ?? false)}
                        title="Italic"
                    >
                        <Italic className="w-4 h-4" />
                    </button>
                    <span className="w-px h-6 bg-neutral-200 mx-1" />
                    <button
                        type="button"
                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                        className={toolbarBtn(editor?.isActive('bulletList') ?? false)}
                        title="Bullet List"
                    >
                        <List className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                        className={toolbarBtn(editor?.isActive('orderedList') ?? false)}
                        title="Numbered List"
                    >
                        <ListOrdered className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                        className={toolbarBtn(editor?.isActive('blockquote') ?? false)}
                        title="Quote"
                    >
                        <Quote className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                        className={toolbarBtn(false)}
                        title="Divider"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-px h-6 bg-neutral-200 mx-1" />
                    <button
                        type="button"
                        onClick={() => editor?.chain().focus().clearNodes().run()}
                        className={toolbarBtn(false)}
                        title="Clear formatting"
                    >
                        <Pilcrow className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor?.chain().focus().undo().run()}
                        disabled={!editor?.can().undo()}
                        className={cn(toolbarBtn(false), 'disabled:opacity-40')}
                        title="Undo"
                    >
                        <Undo2 className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => editor?.chain().focus().redo().run()}
                        disabled={!editor?.can().redo()}
                        className={cn(toolbarBtn(false), 'disabled:opacity-40')}
                        title="Redo"
                    >
                        <Redo2 className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="bg-white">
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    )
}

export default RichTextEditor
