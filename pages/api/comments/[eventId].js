import { ALL_COMMENTS } from '../../../shared/constants/endpoint.constant';

/**
 * * /api/comments/{eventId}
 */
export default async function handler(req, res) {
  const eventId = req.query.eventId;

  let result;

  switch (req.method) {
    case 'POST':
      const { email, name, text } = req.body;

      if (
        !email.includes('@') ||
        !name ||
        name.trim() === '' ||
        !text ||
        text.trim() === ''
      ) {
        res.status(422).json({ message: 'Invalid input' });
      }

      console.log(email, name, text);

      const newComment = {
        id: new Date().toISOString(),
        email,
        name,
        text,
        eventId,
      };

      result = await fetch(ALL_COMMENTS, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => response.json());

      res.status(201).json({ message: 'Added comment', comment: result });

      break;

    case 'GET':
      try {
        result = await fetch(ALL_COMMENTS).then((response) => response.json());
      } catch (err) {
        res.status(500).json({ message: 'Inserting data failed' });
        return;
      }

      result.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));

      result = result.filter((item) => item.eventId === eventId);

      res.status(200).json({ comments: result });

      break;

    default:
      break;
  }
}
