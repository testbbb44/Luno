// import { Button } from "@/components/ui/button"

import { Button } from "@mui/material";

export default function SignatureSection({ ownerSignature, employeeSignature, onOwnerSignature, onEmployeeSignature }) {
  return (
    <div className="mt-8 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-4">Signatures</h2>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Owner Signature</h3>
          {ownerSignature ? (
            <div className="border rounded-md p-4">
              <img src={ownerSignature} alt="Owner Signature" className="w-full" />
              <Button className="mt-2" onClick={onOwnerSignature}>Change Signature</Button>
            </div>
          ) : (
            <Button onClick={onOwnerSignature}>Add Signature</Button>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Employee Signature</h3>
          {employeeSignature ? (
            <div className="border rounded-md p-4">
              <img src={employeeSignature} alt="Employee Signature" className="w-full" />
              <Button className="mt-2" onClick={onEmployeeSignature}>Change Signature</Button>
            </div>
          ) : (
            <Button onClick={onEmployeeSignature}>Add Signature</Button>
          )}
        </div>
      </div>
    </div>
  )
}

