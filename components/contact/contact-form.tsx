import React, { FormEvent, useEffect, useState } from 'react';
import classes from './contact-form.module.css';
import { IContactInput } from '../../shared/interfaces/contact-input.interface';
import { StatusEnum } from '../../shared/enum/status.enum';
import { INotificationData } from '../../shared/interfaces/notification.interface';
import { Notification } from '../ui/notification';

export const ContactForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const [requestStatus, setRequestStatus] = useState<StatusEnum | null>(); // 'pending' | 'success' | 'error'
  const [requestError, setRequestError] = useState<string>('');

  useEffect(() => {
    if (
      requestStatus === StatusEnum.SUCCESS ||
      requestStatus === StatusEnum.ERROR
    ) {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event: FormEvent) {
    event.preventDefault();

    const input: IContactInput = {
      email,
      name,
      message,
    };

    setRequestStatus(StatusEnum.PENDING);

    try {
      await sendContactData(input);
      setRequestStatus(StatusEnum.SUCCESS);
      setEmail('');
      setName('');
      setMessage('');
    } catch (err: any) {
      setRequestStatus(StatusEnum.ERROR);
      setRequestError(err.message);
    }
  }

  let notificationData: INotificationData | null;

  switch (requestStatus) {
    case StatusEnum.PENDING:
      notificationData = {
        status: requestStatus,
        title: 'Sending message...',
        message: 'Your message is on your way',
      };
      break;
    case StatusEnum.SUCCESS:
      notificationData = {
        status: requestStatus,
        title: 'Success!',
        message: 'Message sent successfully!',
      };
      break;
    case StatusEnum.ERROR:
      notificationData = {
        status: StatusEnum.ERROR,
        title: 'Error',
        message: requestError,
      };
      break;
    default:
      notificationData = null;
      break;
  }

  async function sendContactData(input: IContactInput) {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>

      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          {/* Email */}
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {/* Name */}
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </div>

        {/* Message */}
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>

      {/* ! React Portal - see README.md */}
      {notificationData && (
        <Notification
          title={notificationData.title}
          message={notificationData.message}
          status={notificationData.status}
        />
      )}
    </section>
  );
};
