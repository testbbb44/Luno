"use client"

import { useState, useEffect } from "react"
import Brand from "@/components/Brand"
import CreateInvestorDialog from "@/components/admin/CreateInvestorDialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/useToast"
import { baseUrl } from "@/features/api/apiSlice"


const ADMIN_USERNAME = "LunoVest"
const ADMIN_PASSWORD = "LunoVest123#"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [createUserOpen, setCreateUserOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [transactions, setTransactions] = useState([])
  const [pagination, setPagination] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [processingTransaction, setProcessingTransaction] = useState(null)
  const [adminNote, setAdminNote] = useState("")
  const [showNoteDialog, setShowNoteDialog] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [actionType, setActionType] = useState("")
  const { toast } = useToast()

  const handleLogin = (event) => {
    event.preventDefault()
    setLoginError("")
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setPassword("")
      setIsAuthenticated(true)
    } else {
      setLoginError("Invalid username or password")
    }
  }

  const logout = () => {
    setPassword("")
    setIsAuthenticated(false)
    setCreateUserOpen(false)
    setTransactions([])
  }

  const fetchTransactions = async (page = 1) => {
    setLoading(true)
    try {
      const response = await fetch(`${baseUrl}admin/pending-transactions?page=${page}&limit=10`)
      const data = await response.json()

      if (data.success) {
        setTransactions(data.data.transactions)
        setPagination(data.data.pagination)
        setCurrentPage(page)
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch transactions",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleTransactionAction = (transaction, action) => {
    setSelectedTransaction(transaction)
    setActionType(action)
    setAdminNote("")
    setShowNoteDialog(true)
  }

  const confirmTransactionAction = async () => {
    if (!selectedTransaction || !actionType) return

    setProcessingTransaction(selectedTransaction.transactionId)
    try {
      const response = await fetch(`${baseUrl}admin/update-transaction-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId: selectedTransaction.transactionId,
          status: actionType === "approve" ? "success" : "failed",
          adminNote: adminNote || `Transaction ${actionType}d by admin`,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Success",
          description: `Transaction ${actionType}d successfully`,
        })
        fetchTransactions(currentPage)
      } else {
        toast({
          title: "Error",
          description: "Failed to update transaction",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to server",
        variant: "destructive",
      })
    } finally {
      setProcessingTransaction(null)
      setShowNoteDialog(false)
      setSelectedTransaction(null)
      setActionType("")
      setAdminNote("")
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchTransactions()
    }
  }, [isAuthenticated])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount)
  }

  if (!isAuthenticated) {
    return (
      <Dialog open={true}>
        <DialogContent className="sm:max-w-md bg-[#f1f1f1]" hideClose>
          <DialogHeader>
            <DialogTitle className="text-center">Admin Login</DialogTitle>
            <DialogDescription className="text-center">
              Please enter your credentials to access the admin panel
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && <p className="text-sm text-red-700" role="alert">{loginError}</p>}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="mb-6"><Brand /></div>
          <span className="lv-eyebrow">ADMINISTRATION</span>
          <h1 className="text-3xl font-semibold text-gray-900 mt-2">Transaction management</h1>
          <p className="text-gray-600">Manage customers and pending transactions</p>
          <Button className="mt-4" onClick={() => setCreateUserOpen(true)}>Create new users</Button>
          <Button variant="outline" className="mt-4 ml-3" onClick={logout}>Log out</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Pending Transactions
            </CardTitle>
            <CardDescription>Review and approve or decline pending transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Crypto</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.transactionId}>
                          <TableCell className="font-mono text-xs">{transaction.transactionId}</TableCell>
                          <TableCell className="font-mono text-xs">{transaction.userId}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{transaction.investmentPlanId}</Badge>
                          </TableCell>
                          <TableCell className="font-semibold">
                            {formatCurrency(transaction.amount, transaction.currency)}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{transaction.amountInCrypto}</div>
                              <div className="text-gray-500">{transaction.cryptoCoinName}</div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">{formatDate(transaction.dateTime)}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{transaction.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-green-50 text-green-700 hover:bg-green-100"
                                onClick={() => handleTransactionAction(transaction, "approve")}
                                disabled={processingTransaction === transaction.transactionId}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-red-50 text-red-700 hover:bg-red-100"
                                onClick={() => handleTransactionAction(transaction, "decline")}
                                disabled={processingTransaction === transaction.transactionId}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Decline
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-700">
                      Showing page {pagination.currentPage} of {pagination.totalPages}({pagination.totalCount} total
                      transactions)
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchTransactions(currentPage - 1)}
                        disabled={!pagination.hasPrev || loading}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fetchTransactions(currentPage + 1)}
                        disabled={!pagination.hasNext || loading}
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <CreateInvestorDialog open={createUserOpen} onOpenChange={setCreateUserOpen} />

        {/* Admin Note Dialog */}

        

        <Dialog  open={showNoteDialog} onOpenChange={setShowNoteDialog}>
        <DialogContent className="sm:max-w-md bg-[#f1f1f1]" hideClose>
            <DialogHeader>
              <DialogTitle>{actionType === "approve" ? "Approve" : "Decline"} Transaction</DialogTitle>
              <DialogDescription>
                {selectedTransaction && (
                  <>
                    Transaction ID: {selectedTransaction.transactionId}
                    <br />
                    Amount: {formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminNote">Admin Note (Optional)</Label>
                <Textarea
                  id="adminNote"
                  placeholder="Enter a note about this action..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowNoteDialog(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={confirmTransactionAction}
                  className={
                    actionType === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }
                >
                  {actionType === "approve" ? "Approve" : "Decline"} Transaction
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
