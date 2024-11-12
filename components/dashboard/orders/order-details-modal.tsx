"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { PrintInvoice } from "./print-invoice";

interface OrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  order: any;
}

export function OrderDetailsModal({ open, onClose, order }: OrderDetailsModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "APPROVED":
        return "info";
      case "PROCESSING":
        return "default";
      case "COMPLETED":
        return "success";
      case "CANCELLED":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order Details - {order.orderNumber}</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePrint}>
                <Printer className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Order Information</h3>
              <dl className="space-y-1">
                <div className="flex items-center gap-2">
                  <dt className="text-muted-foreground">Type:</dt>
                  <dd><Badge variant="outline">{order.type}</Badge></dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="text-muted-foreground">Status:</dt>
                  <dd>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="text-muted-foreground">Date:</dt>
                  <dd>{order.createdAt}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="font-medium mb-2">
                {order.type === "PURCHASE" ? "Supplier" : "Customer"} Information
              </h3>
              <p>
                {order.type === "PURCHASE" ? order.supplier : order.customer}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Order Items</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items?.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      ${item.unitPrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.totalPrice.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">
                    Total Amount
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ${order.totalAmount.toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {order.notes && (
            <div>
              <h3 className="font-medium mb-2">Notes</h3>
              <p className="text-muted-foreground">{order.notes}</p>
            </div>
          )}
        </div>

        <div className="hidden">
          <PrintInvoice ref={printRef} order={order} />
        </div>
      </DialogContent>
    </Dialog>
  );
}