// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { IContactInput } from '../../../shared/interfaces/contact-input.interface';

type DataResponse = {
    message: string;
    data?: any;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<DataResponse>
) {
    //   res.status(200).json({ name: 'John Doe' })
    if (req.method === 'POST') {
        const input: IContactInput = req.body;

        const { email, name, message } = input;

        const invalidEmail = !email || !email.includes('@');
        const invalidName = !name || name.trim() === '';
        const invalidMessage = !message || message.trim() === '';

        const invalid = invalidEmail || invalidName || invalidMessage;

        if (invalid) {
            res.status(422).json({ message: 'Invalid input' });
            return;
        }

        // Store in database
        // process.env (environment variables) is written in `next.config.js`
        fetch(`${process.env.my_connection_string}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        });

        res.status(201).json({ message: 'Successfully stored message', data: input });
    }
}
