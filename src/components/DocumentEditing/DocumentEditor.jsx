import { useState, useCallback, useRef } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import { jsPDF } from 'jspdf'
import Header from './Header'
import Toolbar from './Toolbar'
import SignatureSection from './SignatureSection'
import ShareDialog from './ShareDialog'
import SignaturePad from './SignaturePad'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function DocumentEditor() {
  const [autoSaveStatus, setAutoSaveStatus] = useState('Saved')
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [shareEmail, setShareEmail] = useState('')
  const [ownerSignature, setOwnerSignature] = useState(null)
  const [employeeSignature, setEmployeeSignature] = useState(null)
  const [isOwnerSignatureDialogOpen, setIsOwnerSignatureDialogOpen] = useState(false)
  const [isEmployeeSignatureDialogOpen, setIsEmployeeSignatureDialogOpen] = useState(false)
  const contentRef = useRef(null)
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
    ],
    content: `
      <h1 style="text-align: center">Save Secure Freelance Agreement</h1>
      <p>This Freelance Agreement ("Agreement") is entered into on [Date] by and between [Freelancer Name] ("Freelancer") and [Client Name] ("Client").</p>
      <h2>1. Scope of Services</h2>
      <p>Freelancer agrees to provide the following services:</p>
      <p>[Detailed description of services]</p>
      <h2>2. Compensation</h2>
      <p>2.1 Payment Terms: Client agrees to pay Freelancer [Amount] per [hour/project/milestone].</p>
      <p>2.2 Invoice Schedule: Freelancer will submit invoices [payment schedule], and payment is due within [X] days of receipt.</p>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      setAutoSaveStatus('Saving...')
      // Simulate autosave delay
      setTimeout(() => setAutoSaveStatus('Saved'), 500)
    },
  })

  const setFont = useCallback((font) => {
    editor?.chain().focus().setFontFamily(font).run()
  }, [editor])

  const setFontSize = useCallback((size) => {
    editor?.chain().focus().setFontSize(`${size}px`).run()
  }, [editor])

  const handleShare = () => {
    setIsShareDialogOpen(true)
  }

  const handleShareSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the share invitation
    console.log(`Sharing document with: ${shareEmail}`)
    setIsShareDialogOpen(false)
    setShareEmail('')
  }

  const handleDownload = () => {
    const doc = new jsPDF()
    
    if (contentRef.current) {
      doc.html(contentRef.current, {
        callback: function (doc) {
          // Add signatures to the PDF
          if (ownerSignature) {
            doc.addImage(ownerSignature, 'PNG', 10, 250, 50, 25)
          }
          if (employeeSignature) {
            doc.addImage(employeeSignature, 'PNG', 100, 250, 50, 25)
          }
          doc.save('freelance-agreement.pdf')
        },
        x: 10,
        y: 10,
        width: 180,
        windowWidth: 650
      })
    }
  }

  const handleOwnerSignature = (dataURL) => {
    setOwnerSignature(dataURL)
    setIsOwnerSignatureDialogOpen(false)
  }

  const handleEmployeeSignature = (dataURL) => {
    setEmployeeSignature(dataURL)
    setIsEmployeeSignatureDialogOpen(false)
  }

  if (!editor) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Header 
        autoSaveStatus={autoSaveStatus}
        onShare={handleShare}
        onDownload={handleDownload}
      />

      <Toolbar 
        editor={editor}
        setFont={setFont}
        setFontSize={setFontSize}
      />

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8 min-h-[1000px]">
        <div ref={contentRef}>
          <EditorContent editor={editor} />
        </div>

        <SignatureSection 
          ownerSignature={ownerSignature}
          employeeSignature={employeeSignature}
          onOwnerSignature={() => setIsOwnerSignatureDialogOpen(true)}
          onEmployeeSignature={() => setIsEmployeeSignatureDialogOpen(true)}
        />
      </div>

      <ShareDialog 
        isOpen={isShareDialogOpen}
        onOpenChange={setIsShareDialogOpen}
        shareEmail={shareEmail}
        setShareEmail={setShareEmail}
        onSubmit={handleShareSubmit}
      />

      {/* Owner Signature Dialog */}
      <Dialog open={isOwnerSignatureDialogOpen} onOpenChange={setIsOwnerSignatureDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Owner Signature</DialogTitle>
            <DialogDescription>
              Please sign in the box below.
            </DialogDescription>
          </DialogHeader>
          <SignaturePad onSave={handleOwnerSignature} />
        </DialogContent>
      </Dialog>

      {/* Employee Signature Dialog */}
      <Dialog open={isEmployeeSignatureDialogOpen} onOpenChange={setIsEmployeeSignatureDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Employee Signature</DialogTitle>
            <DialogDescription>
              Please sign in the box below.
            </DialogDescription>
          </DialogHeader>
          <SignaturePad onSave={handleEmployeeSignature} />
        </DialogContent>
      </Dialog>

      {/* Keyboard Shortcuts Help */}
      <div className="fixed bottom-4 right-4 text-sm text-muted-foreground">
        <p>Press ⌘ + B for bold</p>
        <p>Press ⌘ + I for italic</p>
        <p>Press ⌘ + U for underline</p>
      </div>
    </div>
  )
}

