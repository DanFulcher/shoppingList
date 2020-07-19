import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {
  const [notifications, setNotifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUserLists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const currentUserID = auth().currentUser._user.uid;

  const getNotifications = () => {
    setLoading(true);
    fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/users/${currentUserID}.json`,
    )
      .then(res => res.json())
      .then(parsedRes => {
        setLists(parsedRes.lists || []);
        setNotifs(parsedRes.notifications || []);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const onAccept = (notification, lists) => {
    lists.forEach(list => {
      fetch(`https://shopping-list-app-e9d27.firebaseio.com/lists/${list}.json`)
        .then(res => res.json())
        .then(async parsedRes => {
          try {
            const jsonValue = await AsyncStorage.getItem('lists');
            const currentLists = jsonValue != null ? JSON.parse(jsonValue) : [];
            currentLists.push(parsedRes);
            try {
              const newLocalLists = JSON.stringify(currentLists);
              await AsyncStorage.setItem('lists', newLocalLists);
            } catch (e) {
              console.log(e);
            }
          } catch (e) {
            console.log(e);
          }
        })
        .then(() => {
          fetch(
            `https://shopping-list-app-e9d27.firebaseio.com/users/${currentUserID}/lists/${
              currentUserLists.length
            }.json`,
            {
              method: 'PATCH',
              body: JSON.stringify({
                id: list,
              }),
            },
          );
          fetch(
            `https://shopping-list-app-e9d27.firebaseio.com/users/${currentUserID}/notifications/${notification}.json`,
            {
              method: 'PATCH',
              body: JSON.stringify({
                read: true,
              }),
            },
          ).then(() => {
            getNotifications();
            setShowModal(true);
          });
        });
    });
  };

  const onReject = notification => {
    fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/users/${currentUserID}/notifications/${notification}.json`,
      {
        method: 'DELETE',
      },
    ).then(() => {
      getNotifications();
    });
  };

  return {
    notifications,
    loading,
    getNotifications,
    onAccept,
    onReject,
    showModal,
    setShowModal,
  };
};
