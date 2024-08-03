import { auth } from "@/lib/auth";

// const middleware = auth((req) => {
//   if(!req.auth && req.nextUrl.pathname !== "/sign-in" && req.nextUrl.pathname !== "/sign-up") {
//     const newUrl = new URL("/sign-in", req.nextUrl.origin);

//     return Response.redirect(newUrl)
//   }

// })

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

// export default middleware
