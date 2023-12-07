import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: {
					label: 'Username',
					type: 'text'
				},
				password: {
					label: 'Password',
					type: 'password'
				}
			},
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				const allowedUser = process.env.USER;
				const allowedPW = process.env.PW;

				if (
					credentials !== undefined &&
					credentials.username === allowedUser &&
					credentials.password === allowedPW
				) {
					// Any object returned will be saved in `user` property of the JWT
					return { id: '0', name: 'Aleben' };
				} else {
					return null;
				}
			}
		})
	]
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };