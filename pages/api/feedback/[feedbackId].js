import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const feedbackId = req.query.feedbackId; // [feedbackId].js

  const filepath = path.join(process.cwd(), 'data', 'feedback.json');
  const filedata = fs.readFileSync(filepath);
  const data = JSON.parse(filedata);

  const feedback = data.find((item) => item.id === feedbackId);

  res.status(200).json({ feedback });
}
