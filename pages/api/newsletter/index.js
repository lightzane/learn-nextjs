import { ALL_EMAILS } from '../../../shared/constants/endpoint.constant';

/**
 * * /api/newsletter
 */
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      // 422 - status code signaling that user input was bad
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    const result = await fetch(ALL_EMAILS, {
      method: 'POST',
      body: { email },
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json());

    res.status(201).json({ message: 'Signed Up', email: result });
  }
}
