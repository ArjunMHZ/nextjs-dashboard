// auth.config.ts

export const runtime = "nodejs";
import Credentials from 'next-auth/providers/credentials';
import { NextAuthConfig } from "next-auth";
import { User } from "./app/lib/definitions";
import { sql } from "@vercel/postgres";
import { z } from 'zod';
// import { compare, hash } from "bcryptjs";
import bcrypt from "bcrypt";

const publicRoutes = ["/sign-in", "/sign-up"];
const authRoutes = ["/sign-in", "/sign-up"];

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const authConfig = {
  // providers: [], // Add your authentication providers here (e.g., GitHub, Google, Credentials)
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
    },

      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(5) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordMatch = await bcrypt.compare(password, user.password)

          if (passwordMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
  callbacks: {
    // authorized({ request: { nextUrl }, auth }) {
    //   const isLoggedIn = !!auth?.user;
    //   const { pathname } = nextUrl;

    //   if (publicRoutes.includes(pathname)) {
    //     return true;
    //   }

    //   if (authRoutes.includes(pathname)) {
    //     if (isLoggedIn) {
    //       return Response.redirect(new URL('/', nextUrl));
    //     }
    //     return true;
    //   }

    //   return isLoggedIn;
    // },

    jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Add the user's role to the JWT token
      }
      return token;
    },
    session({ session, token }: { session: any, token: any }) {

      session.user.role = token.role; // Add the role to the session object
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom login page
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
