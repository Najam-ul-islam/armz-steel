// "use client";

// import { useRef } from "react";
// import { useReactToPrint } from "react-to-print";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Download, Printer } from "lucide-react";
// import { PrintInvoice } from "./print-invoice";

// interface OrderDetailsModalProps {
//   open: boolean;
//   onClose: () => void;
//   order: any;
// }

// export function OrderDetailsModal({ open, onClose, order }: OrderDetailsModalProps) {
//   const printRef = useRef<HTMLDivElement>(null);

//   const handlePrint = useReactToPrint({
//     content: () => printRef.current,
//   });

//   if (!order) return null;

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "PENDING":
//         return "warning";
//       case "APPROVED":
//         return "info";
//       case "PROCESSING":
//         return "default";
//       case "COMPLETED":
//         return "success";
//       case "CANCELLED":
//         return "destructive";
//       default:
//         return "default";
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-3xl">
//         <DialogHeader>
//           <DialogTitle className="flex items-center justify-between">
//             <span>Order Details - {order.orderNumber}</span>
//             <div className="flex items-center gap-2">
//               <Button variant="outline" size="icon" onClick={handlePrint}>
//                 <Printer className="h-4 w-4" />
//               </Button>
//               <Button variant="outline" size="icon">
//                 <Download className="h-4 w-4" />
//               </Button>
//             </div>
//           </DialogTitle>
//         </DialogHeader>

//         <div className="space-y-6">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <h3 className="font-medium mb-2">Order Information</h3>
//               <dl className="space-y-1">
//                 <div className="flex items-center gap-2">
//                   <dt className="text-muted-foreground">Type:</dt>
//                   <dd><Badge variant="outline">{order.type}</Badge></dd>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <dt className="text-muted-foreground">Status:</dt>
//                   <dd>
//                     <Badge variant={getStatusColor(order.status)}>
//                       {order.status}
//                     </Badge>
//                   </dd>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <dt className="text-muted-foreground">Date:</dt>
//                   <dd>{order.createdAt}</dd>
//                 </div>
//               </dl>
//             </div>

//             <div>
//               <h3 className="font-medium mb-2">
//                 {order.type === "PURCHASE" ? "Supplier" : "Customer"} Information
//               </h3>
//               <p>
//                 {order.type === "PURCHASE" ? order.supplier : order.customer}
//               </p>
//             </div>
//           </div>

//           <div>
//             <h3 className="font-medium mb-2">Order Items</h3>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Product</TableHead>
//                   <TableHead className="text-right">Quantity</TableHead>
//                   <TableHead className="text-right">Unit Price</TableHead>
//                   <TableHead className="text-right">Total</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {order.items?.map((item: any) => (
//                   <TableRow key={item.id}>
//                     <TableCell>{item.product.name}</TableCell>
//                     <TableCell className="text-right">{item.quantity}</TableCell>
//                     <TableCell className="text-right">
//                       ${item.unitPrice.toLocaleString()}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       ${item.totalPrice.toLocaleString()}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 <TableRow>
//                   <TableCell colSpan={3} className="text-right font-medium">
//                     Total Amount
//                   </TableCell>
//                   <TableCell className="text-right font-bold">
//                     ${order.totalAmount.toLocaleString()}
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </div>

//           {order.notes && (
//             <div>
//               <h3 className="font-medium mb-2">Notes</h3>
//               <p className="text-muted-foreground">{order.notes}</p>
//             </div>
//           )}
//         </div>

//         <div className="hidden">
//           <PrintInvoice ref={printRef} order={order} />
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }




// "use client";

// import { useRef } from "react";
// import { useReactToPrint } from "react-to-print";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Download, Printer } from "lucide-react";
// import { PrintInvoice } from "./print-invoice";

// interface OrderDetailsModalProps {
//   open: boolean;
//   onClose: () => void;
//   order: any;
// }

// export function OrderDetailsModal({ open, onClose, order }: OrderDetailsModalProps) {
//   const printRef = useRef<HTMLDivElement>(null);

//   const handlePrint = useReactToPrint({
//     content: () => printRef.current,
//   });

//   if (!order) return null;

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "PENDING":
//         return "warning";
//       case "APPROVED":
//         return "info";
//       case "PROCESSING":
//         return "default";
//       case "COMPLETED":
//         return "success";
//       case "CANCELLED":
//         return "destructive";
//       default:
//         return "default";
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-3xl">
//         <DialogHeader>
//           <DialogTitle className="flex items-center justify-between">
//             <span>Order Details - {order.orderNumber}</span>
//             <div className="flex items-center gap-2">
//               <Button variant="outline" size="icon" onClick={handlePrint}>
//                 <Printer className="h-4 w-4" />
//               </Button>
//               <Button variant="outline" size="icon">
//                 <Download className="h-4 w-4" />
//               </Button>
//             </div>
//           </DialogTitle>
//         </DialogHeader>

//         <div className="space-y-6">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <h3 className="font-medium mb-2">Order Information</h3>
//               <dl className="space-y-1">
//                 <div className="flex items-center gap-2">
//                   <dt className="text-muted-foreground">Type:</dt>
//                   <dd><Badge variant="outline">{order.type}</Badge></dd>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <dt className="text-muted-foreground">Status:</dt>
//                   <dd>
//                     <Badge variant={getStatusColor(order.status)}>
//                       {order.status}
//                     </Badge>
//                   </dd>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <dt className="text-muted-foreground">Date:</dt>
//                   <dd>{order.createdAt}</dd>
//                 </div>
//               </dl>
//             </div>

//             <div>
//               <h3 className="font-medium mb-2">
//                 {order.type === "PURCHASE" ? "Supplier" : "Customer"} Information
//               </h3>
//               <p>
//                 {order.type === "PURCHASE" ? order.supplier : order.customer}
//               </p>
//             </div>
//           </div>

//           <div>
//             <h3 className="font-medium mb-2">Order Items</h3>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Product</TableHead>
//                   <TableHead className="text-right">Quantity</TableHead>
//                   <TableHead className="text-right">Unit Price</TableHead>
//                   <TableHead className="text-right">Total</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {order.items?.map((item: any) => (
//                   <TableRow key={item.id}>
//                     <TableCell>{item.product.name}</TableCell>
//                     <TableCell className="text-right">{item.quantity}</TableCell>
//                     <TableCell className="text-right">
//                       ${item.unitPrice.toLocaleString()}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       ${item.totalPrice.toLocaleString()}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 <TableRow>
//                   <TableCell colSpan={3} className="text-right font-medium">
//                     Total Amount
//                   </TableCell>
//                   <TableCell className="text-right font-bold">
//                     ${order.totalAmount.toLocaleString()}
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </div>

//           {order.notes && (
//             <div>
//               <h3 className="font-medium mb-2">Notes</h3>
//               <p className="text-muted-foreground">{order.notes}</p>
//             </div>
//           )}
//         </div>

//         <div className="hidden">
//           <PrintInvoice ref={printRef} order={order} />
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }







import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { Order } from "@prisma/client";

interface OrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
}

export const OrderDetailsModal = ({
  open,
  onClose,
  order,
}: OrderDetailsModalProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload(); // Reload the page to restore app state
    }
  };

  if (!order) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold">
            Order Details - {order.orderNumber}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        {/* Modal Content */}
        <div ref={printRef} className="p-8 space-y-8">
          {/* Invoice Header */}
          <div className="border-b pb-4">
            <h1 className="text-2xl font-bold text-center">Invoice</h1>
            <div className="flex justify-between text-sm mt-2">
              <p>
                <strong>Company Name:</strong> Arms Steel<br />
                <strong>Address:</strong> 123 Main Street, City, Country
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {/* {new Date(order.createdAt).toLocaleString()} <br /> */}
                {new Date().toLocaleDateString()} <br />
                <strong>Invoice Number:</strong> {order.orderNumber}<br />
                <strong>NTN:</strong>
              </p>
            </div>
          </div>

          {/* Order Information */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm">
                <strong>Type:</strong> {order.type}
              </p>
              <p className="text-sm">
                <strong>Status:</strong>{" "}
                <span className="px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-600 rounded-lg">
                  {order.status}
                </span>
              </p>
              <p className="text-sm">
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm">
                <strong>Supplier:</strong> {order.supplier}
              </p>
            </div>
          </div>

          {/* Order Items Table */}
          <div>
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-3 text-left">
                    Product
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-center">
                    Quantity
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-right">
                    Unit Price
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">
                      {item.product.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      ${item.unitPrice.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      ${item.totalPrice.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Amount */}
          <p className="text-lg font-semibold text-right">
            Total Amount: ${order.totalAmount.toFixed(2)}
          </p>

          {/* Notes Section */}
          <div>
            <p className="font-medium text-gray-700">
              <strong>Notes:</strong>
            </p>
            <div className="mt-2 p-4 border rounded-md text-gray-800 bg-gray-50">
              {order.notes || "No notes provided."}
            </div>
          </div>

          {/* Invoice Footer */}
          <div className="border-t pt-4 mt-8">
            <p className="text-center text-sm text-gray-600">
              Thank you for your business! <br />
              For inquiries, contact us at: armssteel31@gmail.com | +123 456 789
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


