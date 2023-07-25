import NextAuth, { getServerSession } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import GoogleProvider from "next-auth/providers/google";

const adminEmails = ["leochen.code@gmail.com"];

export const authOps = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	adapter: MongoDBAdapter(clientPromise),
	callbacks: {
		session: ({ session, token, user }) => {
			if (adminEmails.includes(session?.user?.email)) {
				return session;
			} else {
				return false;
			}
		},
	},
};
export default NextAuth(authOps);

export async function isAdmReq(req, res) {
	const session = await getServerSession(req, res, authOps);
	if (!adminEmails.includes(session?.user?.email)) {
		res.status(401);
    res.end();
		throw "Bad credentials for adm";
	}
}
