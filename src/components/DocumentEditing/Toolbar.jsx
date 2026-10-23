// import { Button } from "@/components/ui/button"
import { Button } from '@mui/material'
import { Bold, Italic, UnderlineIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify, Undo2, Redo2 } from 'lucide-react'

const fonts = [
  { name: 'Times New Roman', value: 'times' },
  { name: 'Arial', value: 'arial' },
  { name: 'Helvetica', value: 'helvetica' },
]

const fontSizes = [
  '8', '10', '12', '14', '16', '18', '20', '24', '28', '32', '36', '48'
]

export default function Toolbar({ editor, setFont, setFontSize }) {
  if (!editor) {
    return null
  }

  return (
    <div className="bg-primary-background text-primary-foreground p-2 rounded-lg mb-6 flex items-center gap-2 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost" 
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo2 className="h-4 w-4" />
        </Button>
      </div>

      <select 
        className="bg-transparent border border-primary-foreground/20 rounded px-2 py-1"
        onChange={(e) => setFont(e.target.value)}
      >
        {fonts.map((font) => (
          <option key={font.value} value={font.value}>
            {font.name}
          </option>
        ))}
      </select>

      <select 
        className="bg-transparent border border-primary-foreground/20 rounded px-2 py-1 w-20"
        onChange={(e) => setFontSize(e.target.value)}
        value={editor.getAttributes('textStyle').fontSize?.replace('px', '') || '16'}
      >
        {fontSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      <div className="flex items-center border-l border-primary-foreground/20 ml-2 pl-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-primary-foreground/20' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-primary-foreground/20' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'bg-primary-foreground/20' : ''}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center border-l border-primary-foreground/20 ml-2 pl-2">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'bg-primary-foreground/20' : ''}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'bg-primary-foreground/20' : ''}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'bg-primary-foreground/20' : ''}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={editor.isActive({ textAlign: 'justify' }) ? 'bg-primary-foreground/20' : ''}
        >
          <AlignJustify className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

