import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setNotification } from '../store/actions';
import { RootState } from '../store/store';

interface NotificationProps {
  message: string;
}

let timeout: ReturnType<typeof setTimeout>;

const Notification: FC<NotificationProps> = ({ message }) => {
  const dispatch = useDispatch();
  const type = useSelector((state: RootState) => state.notification.type);

  useEffect(() => {
    if(message !== '') {
      if(timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        dispatch(setNotification(''));
      }, 3000);
    }
  }, [dispatch, message]);

  const closeNotification = () => {
    dispatch(setNotification(''));
    clearTimeout(timeout);
  }

  return(
    <div className={message ? `${type === 'danger' ? 'notification is-danger' : 'notification is-primary'}` : 'notification is-hidden' }>
      <button className="delete" onClick={closeNotification}></button>
      <p>{message}</p>
    </div>
  );
}

export default Notification;