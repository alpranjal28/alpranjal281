import mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@/app/models/User";
import bcrypt from "bcrypt";
import Google from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

export const authOptions={
  secret: process.env.NEXTAUTH_SECRET,
	adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",

      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "test@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        // console.log(`this is credentials `, credentials); 
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL as string);

        const user = await User.findOne({ email });
        const passwordMatch =
          user && bcrypt.compareSync(password, user.password);

        if (passwordMatch) {
          return user;
        }

        return null;
      },
    }),
  ],
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
