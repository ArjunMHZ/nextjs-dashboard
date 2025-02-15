// app/api/auth/signUp/route.ts

import { sql } from '@vercel/postgres'; // PostgreSQL connection
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// Zod schema for validation
const SignUpSchema = z.object({
  name: z.string().min(3, "Name should have at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password should have at least 6 characters"),
});

// Named export for POST method
export async function POST(req: Request) {
  try {
    // Parse incoming JSON request body
    const body = await req.json();

    // Validate request body using Zod schema
    const parsedData = SignUpSchema.parse(body);

    const { email, password, name } = parsedData;

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await sql`
      INSERT INTO users (email, password, name)
      VALUES (${email}, ${hashedPassword}, ${name})
      RETURNING *
    `;

    const newUser = result.rows[0];

    // Respond with the new user
    return new Response(
      JSON.stringify({ message: 'User created successfully', user: newUser }),
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ message: error.errors.map((e) => e.message).join(', ') }),
        { status: 400 }
      );
    }
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Something went wrong during registration' }),
      { status: 500 }
    );
  }
}
