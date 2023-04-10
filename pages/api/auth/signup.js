import { hashPassword } from '../../../helpers/auth.util';
import { Constants_URL } from '../../../shared/constants/url.constant';

export default async function handler(req, res) {
  if (req.method !== 'POST') return;

  const data = req.body;

  const { email, password } = data;

  const invalidEmail = !email || !email.includes('@');

  const invalidPassword = !password || password.length < 7;

  const invalid = invalidEmail || invalidPassword;

  if (invalid) {
    res.status(422).json({
      message:
        'Invalid input and password must be at least 7 or more characters',
    });
    return;
  }

  const existingUsers = await fetch(Constants_URL.DB).then((response) =>
    response.json()
  );

  const existingUser = existingUsers.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    res.status(422).json({ message: 'Email already taken' });
    return;
  }

  const hashedPassword = await hashPassword(password);

  const response = await fetch(Constants_URL.DB, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: hashedPassword }),
  });

  if (!response.ok) {
    res.status(500).json({ message: 'Storing to DB went wrong!' });
  }

  res.status(201).json({ message: 'Created user!' });
}
