// app/api/protected/route.ts
// import { auth } from "@/auth";
// import { NextResponse } from "next/server";

// export async function GET() {
//   const session = await auth();
//   if (!session || session.user.role !== "admin") {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }
//   return NextResponse.json({ message: "Welcome, admin!" });
// }