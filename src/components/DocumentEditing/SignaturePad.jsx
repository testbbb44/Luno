
import { Button } from '@mui/material'
import React, { useRef, useEffect } from 'react'
import SignaturePadLib from 'signature_pad'
// import { Button } from "@/components/ui/button"

export default function SignaturePad({ onSave }) {
  const canvasRef = useRef(null)
  const signaturePadRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePadLib(canvasRef.current, {
        backgroundColor: 'rgb(255, 255, 255)'
      })
    }
  }, [])

  const handleClear = () => {
    signaturePadRef.current?.clear()
  }

  const handleSave = () => {
    if (signaturePadRef.current?.isEmpty()) {
      alert("Please provide a signature first.")
    } else {
      const dataURL = signaturePadRef.current.toDataURL()
      onSave(dataURL)
    }
  }

  return (
    <div className="border rounded-md p-4">
      <canvas ref={canvasRef} className="border rounded-md w-full h-40" />
      <div className="flex justify-between mt-2">
        <Button variant="outline" onClick={handleClear}>Clear</Button>
        <Button onClick={handleSave}>Save Signature</Button>
      </div>
    </div>
  )
}

