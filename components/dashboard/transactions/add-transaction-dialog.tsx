// "use client";

// import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";

// const transactionSchema = z.object({
//   type: z.enum(["INBOUND", "OUTBOUND", "ADJUSTMENT"]),
//   productId: z.string().min(1, "Please select a product"),
//   quantity: z.number().min(1, "Quantity must be greater than 0"),
//   reference: z.string().min(1, "Reference is required"),
//   notes: z.string().optional(),
// });

// const products = [
//   { id: "1", name: "Steel Rebar" },
//   { id: "2", name: "Steel Plate" },
//   { id: "3", name: "Steel Pipe" },
// ];

// interface AddTransactionDialogProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// export function AddTransactionDialog({
//   open,
//   onOpenChange,
// }: AddTransactionDialogProps) {
//   const form = useForm<z.infer<typeof transactionSchema>>({
//     resolver: zodResolver(transactionSchema),
//     defaultValues: {
//       type: "INBOUND",
//       quantity: 1,
//     },
//   });

//   async function onSubmit(data: z.infer<typeof transactionSchema>) {
//     try {
//       console.log(data);
//       // Here you would typically make an API call to save the transaction
//       onOpenChange(false);
//       form.reset();
//     } catch (error) {
//       console.error("Failed to create transaction:", error);
//     }
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add Transaction</DialogTitle>
//           <DialogDescription>
//             Create a new inventory transaction record.
//           </DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="type"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Transaction Type</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select type" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="INBOUND">Inbound</SelectItem>
//                       <SelectItem value="OUTBOUND">Outbound</SelectItem>
//                       <SelectItem value="ADJUSTMENT">Adjustment</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="productId"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Product</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select product" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {products.map((product) => (
//                         <SelectItem key={product.id} value={product.id}>
//                           {product.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="quantity"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Quantity</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       {...field}
//                       onChange={(e) =>
//                         field.onChange(parseInt(e.target.value, 10))
//                       }
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="reference"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Reference</FormLabel>
//                   <FormControl>
//                     <Input {...field} placeholder="e.g., PO-2024-001" />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="notes"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Notes</FormLabel>
//                   <FormControl>
//                     <Textarea {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="flex justify-end space-x-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => onOpenChange(false)}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit">Create Transaction</Button>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const transactionSchema = z.object({
  type: z.enum(["INBOUND", "OUTBOUND", "ADJUSTMENT"]),
  productId: z.string().min(1, "Please select a product"),
  quantity: z.number().min(1, "Quantity must be greater than 0"),
  reference: z.string().min(1, "Reference is required"),
  notes: z.string().optional(),
});

interface Product {
  id: string;
  name: string;
  stock: number;
}

interface AddTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddTransactionDialog({
  open,
  onOpenChange,
  onSuccess,
}: AddTransactionDialogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "INBOUND",
      productId: "",
      quantity: 1,
      reference: "",
      notes: "",
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Error loading products");
      }
    };

    if (open) {
      fetchProducts();
    }
  }, [open]);

  async function onSubmit(data: z.infer<typeof transactionSchema>) {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/transaction", data);
      toast.success("Transaction created successfully");
      onSuccess();
      onOpenChange(false);
      form.reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error details:", error.toJSON());
        const errorMessage =
          error.response?.data?.error || error.response?.statusText || "Failed to create transaction";
        toast.error(`Error: ${errorMessage}`);
        console.error("Error response:", error.response?.data);
      } else {
        toast.error("An unexpected error occurred");
        console.error("Unexpected error:", error);
      }
   }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Create a new inventory transaction record.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="INBOUND">Inbound</SelectItem>
                      <SelectItem value="OUTBOUND">Outbound</SelectItem>
                      <SelectItem value="ADJUSTMENT">Adjustment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} (Stock: {product.stock})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., PO-2024-001" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Transaction"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}