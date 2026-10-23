// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
// import { input } from "@/components/ui/input"
// import { label } from "@/components/ui/label"

export default function ShareDialog({ isOpen, onOpenChange, shareEmail, setShareEmail, onSubmit }) {
  return (
    <div className="">hi</div>
    // <Dialog open={isOpen} onOpenChange={onOpenChange}>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle>Share Document</DialogTitle>
    //       <DialogDescription>
    //         Enter the email address of the person you want to share this document with.
    //       </DialogDescription>
    //     </DialogHeader>
    //     <form onSubmit={onSubmit}>
    //       <div className="grid gap-4 py-4">
    //         <div className="grid grid-cols-4 items-center gap-4">
    //           <label htmlFor="email" className="text-right">
    //             Email
    //           </label>
    //           <input
    //             id="email"
    //             value={shareEmail}
    //             onChange={(e) => setShareEmail(e.target.value)}
    //             placeholder="example@example.com"
    //             className="col-span-3"
    //           />
    //         </div>
    //       </div>
    //       <DialogFooter>
    //         <Button type="submit">Share</Button>
    //       </DialogFooter>
    //     </form>
    //   </DialogContent>
    // </Dialog>
  )
}

