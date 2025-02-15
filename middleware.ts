import { auth } from "./auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

   // Allow access to the login page for unauthenticated users
   if (pathname === "/login" && !session) {
    return;
  }

  if (!session && pathname !== "/login") {
    return Response.redirect(new URL("/login", req.url));
  }

  if (session && pathname === "/login") {
    return Response.redirect(new URL("/", req.url));
  }

  if (session?.user?.role !== "admin" && pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/", req.url));
  }
  
  // Users with "user" role can access the cart
  if (session?.user?.role === "user" && pathname.startsWith("/cart")) {
    return;
  }

  // Any other case where the session role does not allow access, redirect to login
  if (session?.user?.role !== "admin" && pathname === "/cart") {
    return Response.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/cart"]
};

// "/((?!api|_next/static|_next/image|favicon.ico).*)"