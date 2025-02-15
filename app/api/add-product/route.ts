import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import path from 'path';
import fs from 'fs';
import { writeFile } from 'fs/promises';

// Initialize multer for image upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = path.join(process.cwd(), 'public', 'products');
//     console.log('Upload directory:', uploadDir); // Add this to log the upload directory
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
//     if (!allowedTypes.includes(file.mimetype)) {
//       return cb(new Error('Only images are allowed.'));
//     }
//     cb(null, true);
//   },
//   limits: { fileSize: 5 * 1024 * 1024 }, // Max file size 5MB
// });



// // Middleware to handle single file upload
// const uploadMiddleware = upload.single('image');


// // Helper function to run multer middleware in Next.js
// function runMiddleware(req: Request, res: Response, fn: Function) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result: any) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }

export async function POST(req: Request, res: Response) {
  try {
    // Run multer middleware to handle image upload
    // await runMiddleware(req, res, uploadMiddleware);

    const formData = await req.formData();

    // Explicit type casting and validation
    const name = formData.get('name') as string;
    const price = formData.get('price') as string; // price will be a string
    const description = formData.get('description') as string;
    const categoryId = formData.get('categoryId') as string;
    const imageFile = formData.get('image') as File;

    // Validate required fields
    if (!name || !price || !description || !categoryId || !imageFile) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    // Convert price to a number (it's a string by default in FormData)
    const priceNum = parseFloat(price);

    if (isNaN(priceNum)) {
      return NextResponse.json({ message: 'Invalid price value.' }, { status: 400 });
    }


    //with this method multer is not use for file upload
    // Convert File to Buffer and store in public/products/
    const bytes = await imageFile.arrayBuffer();
    const buffer = new Uint8Array(bytes);

    // Generate a unique filename
    const fileName = imageFile.name;
    const filePath = path.join(process.cwd(), 'public/products', fileName);

    // Write the file to public/products
    await writeFile(filePath, buffer);



    // Image URL
    const imageUrl = `/products/${imageFile.name}`;

    // Check if the image is stored in the public/product folder
    const imagePath = path.join(process.cwd(), 'public', 'products', imageFile.name);
    if (!fs.existsSync(imagePath)) {
      return NextResponse.json({ message: 'Image not stored correctly in the public/products folder.' }, { status: 500 });
    }

    // Insert product details into the database
    await sql`
      INSERT INTO products (name, price, description, category_id, image_url)
      VALUES (${name}, ${priceNum}, ${description}, ${categoryId}, ${imageUrl})
    `;

    return NextResponse.json({ message: 'Product created successfully!' }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error saving product to database.' }, { status: 500 });
  }
}
