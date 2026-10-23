// import { Button } from "@/components/ui/button"
import { Button } from '@mui/material'
import { ChevronLeft, MoreHorizontal, Share, Save, Download } from 'lucide-react'

export default function Header({ autoSaveStatus, onShare, onDownload }) {
  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold">Save Secure Freelance Agreement</h1>
          <p className="text-sm text-muted-foreground">
            {autoSaveStatus} • Draft
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={() => console.log('Saving document...')}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button variant="outline" onClick={onShare}>
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button variant="outline" onClick={onDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}

