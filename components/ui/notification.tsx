import React from 'react';
import ReactDOM from 'react-dom';
import { StatusEnum } from '../../shared/enum/status.enum';
import { INotificationData } from '../../shared/interfaces/notification.interface';
import classes from './notification.module.css';

export const Notification: React.FC<INotificationData> = (props) => {
  const { title, message, status } = props;

  let statusClasses = '';

  if (status === StatusEnum.SUCCESS) {
    statusClasses = classes.success;
  }

  if (status === StatusEnum.ERROR) {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  // ! Even if this is being used inside `components/contact/contact-form.tsx`
  // it will be portal into the #notifications container
  // see also pages/_document.tsx
  // For more details, see README.md
  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById('notifications') as HTMLDivElement // * see pages/_document.tsx
  );
};
