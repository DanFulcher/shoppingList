import {useState} from 'react';
import auth from '@react-native-firebase/auth';

export default () => {
  const [notifications, setNotifs] = useState([]);

  const currentUserID = auth().currentUser._user.uid;

  const getNotifications = () => {
    fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/users/${currentUserID}.json`,
    )
      .then(res => res.json())
      .then(parsedRes => {
        setNotifs(parsedRes.notifications || []);
      });
  };

  return {
    notifications,
    getNotifications,
  };
};
