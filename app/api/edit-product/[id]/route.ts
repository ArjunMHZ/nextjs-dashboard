import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres"; // Ensure you have a db instance connected to Vercel Postgres
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { z } from "zod";
import { existsSync } from "fs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Zod validation schema
const FormSchema = z.object({
  name: z.string().min(1, "Product name is required."),
  price: z.coerce.number().gt(0, "Price must be greater than 0."),
  description: z.string().min(1, "Product description is required."),
  categoryId: z.string().min(1, "Category selection is required."),
  image: z.string().optional(), // Image path as string
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const productId = params.id;

  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const categoryId = formData.get("categoryId") as string;
    const image = formData.get("image") as File | null;

    // Fetch existing product details
    const existingProduct = await sql.query("SELECT * FROM products WHERE id = $1", [productId]);
    if (existingProduct.rowCount === 0) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    const oldImagePath = existingProduct.rows[0].image;

    // Validate input
    const validation = FormSchema.safeParse({ name, price, description, categoryId, image: oldImagePath });
    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
    }

    let imagePath = oldImagePath; // Default to existing image

    // Handle image upload
    if (image) {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer); // Convert ArrayBuffer to Uint8Array
        const fileExtension = image.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExtension}`;
        const uploadPath = path.join(process.cwd(), "public/products", fileName);
      
        // Save new image
        await writeFile(uploadPath, buffer); // Uint8Array is compatible
      
        imagePath = `/products/${fileName}`;
      
        // Delete old image if it exists
        if (oldImagePath && existsSync(path.join(process.cwd(), "public", oldImagePath))) {
          await unlink(path.join(process.cwd(), "public", oldImagePath));
        }
      }
      

    // Update product in the database
    await sql.query(
      "UPDATE products SET name = $1, price = $2, description = $3, category_id = $4, image = $5 WHERE id = $6",
      [name, price, description, categoryId, imagePath, productId]
    );

    revalidatePath('/dashboard/products');
    redirect('/dashboard/products');

    // return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
