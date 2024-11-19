"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface Transaction {
  id: string;
  type: "INBOUND" | "OUTBOUND" | "ADJUSTMENT";
  product: {
    name: string;
    sku: string;
  };
  quantity: number;
  reference: string;
  notes?: string;
  createdAt: string;
}

interface TransactionDetailsDialogProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionDetailsDialog({
  transaction,
  open,
  onOpenChange,
}: TransactionDetailsDialogProps) {
  if (!transaction) return null;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow pop-ups to print receipts");
      return;
    }

    const receiptHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Transaction Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 20px; }
          .details { margin-bottom: 20px; }
          .table { width: 100%; border-collapse: collapse; }
          .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Transaction Receipt</h1>
          <p>Reference: ${transaction.reference}</p>
        </div>
        <div class="details">
          <p><strong>Date:</strong> ${new Date(transaction.createdAt).toLocaleString()}</p>
          <p><strong>Type:</strong> ${transaction.type}</p>
          <p><strong>Product:</strong> ${transaction.product.name}</p>
          <p><strong>SKU:</strong> ${transaction.product.sku}</p>
          <p><strong>Quantity:</strong> ${transaction.quantity}</p>
          ${transaction.notes ? `<p><strong>Notes:</strong> ${transaction.notes}</p>` : ''}
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(receiptHtml);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Reference</label>
              <p className="mt-1">{transaction.reference}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Type</label>
              <div className="mt-1">
                <Badge
                  variant={
                    transaction.type === "INBOUND"
                      ? "default"
                      : transaction.type === "OUTBOUND"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {transaction.type}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Product</label>
              <p className="mt-1">{transaction.product.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">SKU</label>
              <p className="mt-1">{transaction.product.sku}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Quantity</label>
              <p className="mt-1">{transaction.quantity}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Date</label>
              <p className="mt-1">
                {new Date(transaction.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          {transaction.notes && (
            <div>
              <label className="text-sm font-medium text-gray-500">Notes</label>
              <p className="mt-1">{transaction.notes}</p>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print Receipt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}