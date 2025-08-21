import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "./lib/db";

export const authConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Invalid credentials");
          }

          const data = await res.json();
          //   console.log("Login response:", data);

          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            image: data.user?.image,
            role: data.user.role,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // First-time sign-in (credentials)
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

          if (account && account.provider === "google") {
        //   console.log(profile);
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                idToked: account.id_token, //from google
                email: profile?.email, //from google
                name: profile?.name, //from google
                avatar: profile?.image || profile?.picture, //from google
              }),
            }
          );
          if (res.ok) {
              const data = await res.json();
            //   console.log(data);
            token.userId = data.user.id;
            token.role = data.user.role;
            token.picture = data.user.image ?? token.picture;
            token.accessToken = data.accessToken;
            token.refreshToken = data.refreshToken;
          }
        } catch (error) {}
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.image = token.picture || token.image || session.user.image;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
