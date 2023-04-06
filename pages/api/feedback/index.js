import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, feedback } = req.body;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    // * Or we can create and export a function since the following 3 lines of code is duplicated
    const filepath = path.join(process.cwd(), 'data', 'feedback.json');
    const filedata = fs.readFileSync(filepath);
    const data = JSON.parse(filedata);

    data.push(newFeedback);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 4));

    res.status(201).json({ message: 'Success!', feedback: newFeedback });
  } else {
    // * Or we can create and export a function since the following 3 lines of code is duplicated
    // Then we can use the exported function to be called inside `getStaticProps()`
    const filepath = path.join(process.cwd(), 'data', 'feedback.json');
    const filedata = fs.readFileSync(filepath);
    const data = JSON.parse(filedata);

    res.status(200).json({ feedback: data });
  }
}
