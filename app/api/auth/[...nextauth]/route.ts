import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/session";

const handler = NextAuth(authOptions);
// this will allow us to make get and post requests using next-auth
export { handler as GET, handler as POST }