import { getServerSession } from 'next-auth/next';
import { hashPassword, verifyPassword } from '../../../helpers/auth.util';
import { Constants_URL } from '../../../shared/constants/url.constant';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return;
  }

  // ! If this is NULL, try clearing all the cache and hard refresh the browser
  // Reference: https://next-auth.js.org/configuration/nextjs#in-api-routes
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'Not authenticated...' });
    return;
  }

  const email = session.user.email; // see [...nextauth].js - it is where the token is stored in session.user
  const oldPassword = req.body.oldPass;
  const newPassword = req.body.newPass;

  const existingUsers = await fetch(Constants_URL.DB).then((response) =>
    response.json()
  );

  const existingUser = existingUsers.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (!existingUser) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  /** The hashed password from the database */
  const currentPassword = existingUser.password;

  const isValid = await verifyPassword(oldPassword, currentPassword);

  if (!isValid) {
    res.status(403).json({ message: 'Invalid password' });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  existingUser.password = hashedPassword;

  const response = await fetch(Constants_URL.DB, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(existingUser),
  });

  res.status(200).json({ message: 'Password updated' });
}
