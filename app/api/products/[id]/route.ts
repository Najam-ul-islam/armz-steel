// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {

//     const product = await prisma.product.findUnique({
//       where: {
//         id: params.id,
//       },
//       include: {
//         category: true,
//       },
//     });

//     if (!product) {
//       return new NextResponse("Product not found", { status: 404 });
//     }

//     return NextResponse.json(product);
//   } catch (error) {
//     console.error("[PRODUCT_GET]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const body = await req.json();
//     const { name, sku, categoryId, description, quantity, unit, minStock } = body;

//     const product = await prisma.product.update({
//       where: {
//         id: params.id,
//       },
//       data: {
//         name,
//         sku,
//         categoryId,
//         description,
//         quantity,
//         unit,
//         minStock,
//       },
//       include: {
//         category: true,
//       },
//     });

//     return NextResponse.json(product);
//   } catch (error) {
//     console.error("[PRODUCT_PATCH]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await prisma.product.delete({
//       where: {
//         id: params.id,
//       },
//     });

//     return new NextResponse(null, { status: 204 });
//   } catch (error) {
//     console.error("[PRODUCT_DELETE]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Define schema for validation
const productSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  categoryId: z.string().uuid(),
  description: z.string().optional(),
  quantity: z.number().int().nonnegative(),
  unit: z.string().min(1),
  minStock: z.number().int().nonnegative(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const result = productSchema.safeParse(body);

    if (!result.success) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const { name, sku, categoryId, description, quantity, unit, minStock } = result.data;

    const product = await prisma.product.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        sku,
        categoryId,
        description,
        quantity,
        unit,
        minStock,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.product.delete({
      where: {
        id: params.id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}