import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: UserType | null;
		accessToken: string | undefined;
		refreshToken: string | undefined;
		error?: any;
	}

	interface User {
		expired_at?: string;
		refresh_token?: string;
		token?: string;
		user: UserType | null;
	}
}

declare module 'next-auth/jwt' {
	/**
	 * Returned by `getToken` and received as a prop on the `SessionProvider` React Context
	 */
	interface JWT {
		user: UserType | null;
		accessToken: string | undefined;
		refreshToken: string | undefined;
		error?: any;
	}
}
