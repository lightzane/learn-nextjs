import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    const notifs =
      activeNotification?.status === 'success' ||
      activeNotification?.status === 'error';

    if (activeNotification && notifs) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotification(notificationData) {
    setActiveNotification(notificationData);
  }

  function hideNotification() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
