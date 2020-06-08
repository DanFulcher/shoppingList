import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default () => {
  const [multiSelMode, setMultiSelMode] = useState(false);
  const [selectedLists, setSelectedLists] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [userList, setUserList] = useState({});

  const navigation = useNavigation();
  const userID = auth().currentUser._user.uid;

  const getList = id => {
    fetch(`https://shopping-list-app-e9d27.firebaseio.com/lists/${id}.json`)
      .then(res => res.json())
      .then(parsedRes => {
        setUserList({
          name: parsedRes.name,
          items: parsedRes.items ? parsedRes.items : [],
          id: id,
        });
      })
      .catch(err => console.log(err));
  };

  const getLists = lists => {
    setUserLists([]);
    lists.forEach(element => {
      fetch(
        `https://shopping-list-app-e9d27.firebaseio.com/lists/${
          element.id
        }.json`,
      )
        .then(res => res.json())
        .then(parsedRes => {
          const list = {
            name: parsedRes.name,
            items: parsedRes.items ? parsedRes.items : [],
            id: element.id,
          };
          setUserLists(currentLists => [...currentLists, list]);
        });
    });
    return userLists;
  };

  const getUsersLists = async () => {
    setUserLists([]);
    const response = await fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/users/${userID}.json`,
    );
    const json = await response.json();
    getLists(json.lists);
  };

  const onOpen = list => {
    const lists = [list];
    navigation.navigate('List View', {
      lists,
    });
  };

  const openMulti = lists => {
    navigation.navigate('List View', {
      lists,
    });
  };

  const onSelectMulti = list => {
    setMultiSelMode(true);
    setSelectedLists([...selectedLists, list]);
  };

  const onDeselect = id => {
    setSelectedLists(selectedLists.filter(item => item.id !== id));
    if (selectedLists.length - 1 < 1) {
      setMultiSelMode(false);
    }
  };

  const clearSel = () => {
    setSelectedLists([]);
    setMultiSelMode(false);
  };

  return {
    multiSelMode,
    setMultiSelMode,
    selectedLists,
    setSelectedLists,
    onOpen,
    openMulti,
    onSelectMulti,
    onDeselect,
    clearSel,
    getList,
    getLists,
    getUsersLists,
    userLists,
    userList,
  };
};
