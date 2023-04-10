import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../helpers/auth.util';
import { Constants_URL } from '../../../shared/constants/url.constant';

/** @type import('next-auth').NextAuthOptions */
export const authOptions = {
  session: {
    jwt: true,
  },
  secret: 'process.env.NEXTAUTH_SECRET',
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = credentials;

        const existingUsers = await fetch(Constants_URL.DB).then((response) =>
          response.json()
        );

        const existingUser = existingUsers.find(
          (user) => user.email.toLowerCase() === email.toLowerCase()
        );

        if (!existingUser) {
          throw new Error('Unknown user is logging in');
        }

        const isValid = await verifyPassword(password, existingUser.password);

        if (!isValid) {
          throw new Error('Could not login');
        }

        return {
          _id: existingUser._id,
          email: existingUser.email,
        };
      },
    }),
  ],
};

/** https://next-auth.js.org/getting-started/example */
export default NextAuth(authOptions);
