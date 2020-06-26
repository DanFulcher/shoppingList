import {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import useUser from '../User/useUser';
import {createFilter} from 'react-native-search-filter';
export default () => {
  const [showModal, setShowModal] = useState(false);
  const [term, setTerm] = useState('');
  const [selectedUser, setSelUser] = useState({});
  const [complete, setComplete] = useState(false);
  const {getUsers, users} = useUser();
  const KEYS_TO_FILTERS = ['name', 'email'];

  useFocusEffect(
    useCallback(() => {
      getUsers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  const searchUpdated = sTerm => {
    setTerm(sTerm);
  };
  const filteredUsers = users.filter(createFilter(term, KEYS_TO_FILTERS));

  const openShareModal = user => {
    setSelUser(user);
    setComplete(false);
    setShowModal(true);
  };

  const shareList = (user, lists) => {
    setComplete(false);
    lists.forEach(element => {
      let i = 0;
      fetch(
        `https://shopping-list-app-e9d27.firebaseio.com/users/${
          user.id
        }/lists/${user.lists ? user.lists.length + i : 0}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            id: element.id,
          }),
        },
      )
        .then(res => {
          console.log(res);
        })
        .catch(err => console.log(err));
      i++;
      if (i === lists.length) {
        setComplete(true);
      }
    });
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
