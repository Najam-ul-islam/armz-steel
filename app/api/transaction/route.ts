// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import { z } from 'zod';
// import { TransactionType } from '@prisma/client';

// const transactionSchema = z.object({
//     type: z.enum(['INBOUND', 'OUTBOUND', 'ADJUSTMENT']),
//     productId: z.string().min(1),
//     quantity: z.number().min(1),
//     notes: z.string().optional(),
//     reference: z.string().min(1),
//   });
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const validatedData = transactionSchema.parse(body);

//     // Find product and ensure it exists
//     const product = await prisma.product.findUnique({
//       where: { id: validatedData.productId },
//     });

//     if (!product) {
//       return NextResponse.json(
//         { error: 'Product not found' },
//         { status: 404 }
//       );
//     }

//     // Ensure newStock is never null by providing a fallback
//     let newStock = product.stock ?? 0;

//     // Adjust stock based on transaction type
//     switch (validatedData.type) {
//       case 'INBOUND':
//         newStock += validatedData.quantity;
//         break;
//       case 'OUTBOUND':
//         if (newStock < validatedData.quantity) {
//           return NextResponse.json(
//             { error: 'Insufficient stock' },
//             { status: 400 }
//           );
//         }
//         newStock -= validatedData.quantity;
//         break;
//       case 'ADJUSTMENT':
//         newStock = validatedData.quantity;
//         break;
//     }

//     // Ensure 'reference' exists in the Prisma schema or remove it
//     const transaction = await prisma.$transaction([
//       prisma.transaction.create({
//         data: {
//           type: validatedData.type as TransactionType,
//           productId: validatedData.productId,
//           quantity: validatedData.quantity,
//           notes: validatedData.notes,
//           reference: validatedData.reference || '', // Use empty string if null
//         },
//       }),
//       prisma.product.update({
//         where: { id: validatedData.productId },
//         data: { stock: newStock },
//       }),
//     ]);

//     return NextResponse.json(transaction[0]); // Return only the transaction
//   } catch (error) {
//     console.error('Error in POST handler:', error);

//     // Handle validation errors
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { error: 'Invalid data', details: error.errors },
//         { status: 400 }
//       );
//     }

//     // Handle other errors
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }
// export async function GET() {
//   try {
//     const transactions = await prisma.transaction.findMany({
//       include: {
//         product: {
//           select: {
//             name: true,
//             sku: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });

//     return NextResponse.json(transactions);
//   } catch (error) {
//     console.error('Transaction fetch error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }


// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(request: { url: string | URL; }) {
//   try {
//     // Parse query parameters
//     const url = new URL(request.url);
//     const type = url.searchParams.get('type');
//     const productId = url.searchParams.get('productId');
//     const startDate = url.searchParams.get('startDate');
//     const endDate = url.searchParams.get('endDate');

//     // Build the query conditions
//     const conditions = {};
//     if (type) conditions.type = type;
//     if (productId) conditions.productId = productId;
//     if (startDate && endDate) {
//       conditions.createdAt = {
//         gte: new Date(startDate),
//         lte: new Date(endDate),
//       };
//     }

//     // Fetch transactions from the database
//     const transactions = await prisma.transaction.findMany({
//       where: conditions,
//       include: {
//         product: true, // Include product details
//       },
//       orderBy: {
//         createdAt: 'desc', // Order by creation date
//       },
//     });

//     // Respond with JSON
//     return new Response(JSON.stringify(transactions), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error) {
//     console.error('Error fetching transactions:', error);
//     return new Response(
//       JSON.stringify({ error: 'Failed to fetch transactions' }),
//       {
//         status: 500,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//   }
// }

// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import { z } from 'zod';
// import { TransactionType } from '@prisma/client';

// // Validation schema
// const transactionSchema = z.object({
//   type: z.enum(['INBOUND', 'OUTBOUND', 'ADJUSTMENT']),
//   productId: z.string().min(1),
//   quantity: z.number().min(1),
//   notes: z.string().optional(),
// });

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const validatedData = transactionSchema.parse(body);

//     // Find product and ensure it exists
//     const product = await prisma.product.findUnique({
//       where: { id: validatedData.productId },
//     });

//     if (!product) {
//       return NextResponse.json(
//         { error: 'Product not found' },
//         { status: 404 }
//       );
//     }

//     // Adjust stock (quantity) based on transaction type
//     let updatedQuantity = product.quantity;

//     switch (validatedData.type) {
//       case 'INBOUND':
//         updatedQuantity += validatedData.quantity;
//         break;
//       case 'OUTBOUND':
//         if (updatedQuantity < validatedData.quantity) {
//           return NextResponse.json(
//             { error: 'Insufficient stock' },
//             { status: 400 }
//           );
//         }
//         updatedQuantity -= validatedData.quantity;
//         break;
//       case 'ADJUSTMENT':
//         updatedQuantity = validatedData.quantity;
//         break;
//     }

//     // Create transaction and update product in a single transaction
//     const [transaction] = await prisma.$transaction([
//       prisma.transaction.create({
//         data: {
//           type: validatedData.type as TransactionType,
//           productId: validatedData.productId,
//           quantity: validatedData.quantity,
//           notes: validatedData.notes,
//         },
//       }),
//       prisma.product.update({
//         where: { id: validatedData.productId },
//         data: { quantity: updatedQuantity },
//       }),
//     ]);

//     return NextResponse.json(transaction); // Return only the transaction
//   } catch (error) {
//     console.error('Error in POST handler:', error);

//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { error: 'Invalid data', details: error.errors },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     const transactions = await prisma.transaction.findMany({
//       include: {
//         product: {
//           select: {
//             name: true,
//             sku: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: 'desc',
//       },
//     });

//     return NextResponse.json(transactions);
//   } catch (error) {
//     console.error('Transaction fetch error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch all transactions with product details
    const transactions = await prisma.transaction.findMany({
      include: {
        product: true, // Include related product information
      },
      orderBy: {
        createdAt: "desc", // Sort by creation date
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("[TRANSACTIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, productId, quantity, notes } = body;

    // Fetch the product to ensure it exists and calculate new stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    let newStock = product.quantity ?? 0;

    // Adjust stock based on transaction type
    switch (type) {
      case "INBOUND":
        newStock += quantity;
        break;
      case "OUTBOUND":
        if (newStock < quantity) {
          return new NextResponse("Insufficient stock", { status: 400 });
        }
        newStock -= quantity;
        break;
      case "ADJUSTMENT":
        newStock = quantity;
        break;
      default:
        return new NextResponse("Invalid transaction type", { status: 400 });
    }

    // Create the transaction and update the product stock
    const transaction = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          type,
          productId,
          quantity,
          notes,
        },
      }),
      prisma.product.update({
        where: { id: productId },
        data: { quantity: newStock },
      }),
    ]);

    return NextResponse.json(transaction[0]); // Return the newly created transaction
  } catch (error) {
    console.error("[TRANSACTIONS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
