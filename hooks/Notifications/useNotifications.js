import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const [notifications, setNotifs] = useState([]);
  const [currentUserLists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const currentUserID = auth().currentUser._user.uid;

  const getNotifications = () => {
    fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/users/${currentUserID}.json`,
    )
      .then(res => res.json())
      .then(parsedRes => {
        setLists(parsedRes.lists || []);
        setNotifs(parsedRes.notifications || []);
      });
  };

  const onAccept = (notification, lists) => {
    lists.forEach(list => {
      let i = 1;
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
      i++;
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
    getNotifications,
    onAccept,
    onReject,
    showModal,
    setShowModal,
  };
};
