import {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import useUser from '../User/useUser';
import {createFilter} from 'react-native-search-filter';
import moment from 'moment';

export default () => {
  const [showModal, setShowModal] = useState(false);
  const [term, setTerm] = useState('');
  const [selectedUser, setSelUser] = useState({});
  const [complete, setComplete] = useState(false);
  const {getUsers, users, getMe, user} = useUser();
  const [sharedLists, setSharedLists] = useState([]);
  const KEYS_TO_FILTERS = ['name', 'email'];
  const timestamp = moment().valueOf();
  useFocusEffect(
    useCallback(() => {
      getUsers();
      getMe();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  useEffect(() => {
    if (complete && sharedLists.length > 0) {
      sendSharedNotification();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete, sharedLists]);
  const searchUpdated = sTerm => {
    setTerm(sTerm);
  };
  const filteredUsers = users.filter(createFilter(term, KEYS_TO_FILTERS));

  const openShareModal = sharedUser => {
    setSelUser(sharedUser);
    setComplete(false);
    setShowModal(true);
  };

  const shareList = (sharedUser, lists) => {
    setComplete(false);
    setSharedLists([]);
    lists.forEach(element => {
      let i = 0;
      fetch('https://shopping-list-app-e9d27.firebaseio.com/lists.json', {
        method: 'POST',
        body: JSON.stringify({
          created_at: element.created_at,
          id: element.id,
          items: element.items,
          name: element.name,
          updated_at: element.updated_at || null,
        }),
      })
        .then(res => res.json())
        .then(parsedRes => {
          const id = parsedRes.name;
          setSharedLists([...sharedLists, id]);
        })
        .catch(err => console.log(err));
      i++;
      if (i === lists.length) {
        setComplete(true);
      }
    });
  };

  const sendSharedNotification = () => {
    fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/users/${
        selectedUser.id
      }/notifications.json`,
      {
        method: 'POST',
        body: JSON.stringify({
          message: `${user.name} has shared ${sharedLists.length} list${
            sharedLists.length > 1 ? 's' : ''
          } with you.`,
          lists: sharedLists,
          read: false,
          created_at: timestamp,
        }),
      },
    );
  };
  return {
    term,
    filteredUsers,
    searchUpdated,
    shareList,
    complete,
    openShareModal,
    selectedUser,
    showModal,
    setShowModal,
  };
};
