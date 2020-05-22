import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

export default () => {
  const [multiSelMode, setMultiSelMode] = useState(false);
  const [selectedLists, setSelectedLists] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [userList, setUserList] = useState({});

  const navigation = useNavigation();
  const user = auth().currentUser;

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
    const listsArray = [];
    lists.forEach(element => {
      fetch(
        `https://shopping-list-app-e9d27.firebaseio.com/lists/${
          element.id
        }.json`,
      )
        .then(res => res.json())
        .then(parsedRes => {
          listsArray.push({
            name: parsedRes.name,
            items: parsedRes.items ? parsedRes.items : [],
            id: element.id,
          });
        });
    });
    setUserLists(listsArray);
  };

  const getAllLists = () => {
    fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/users/${
        user._user.uid
      }.json`,
    )
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
        const listsArray = [];
        parsedRes.lists.forEach(element => {
          fetch(
            `https://shopping-list-app-e9d27.firebaseio.com/lists/${
              element.id
            }.json`,
          )
            .then(res => res.json())
            .then(responseList => {
              listsArray.push({
                name: responseList.name,
                items: responseList.items ? responseList.items : [],
                id: element.id,
              });
              setUserLists(listsArray);
              console.log(userLists);
            });
        });
        // console.log(listsArray);
      });
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
    getAllLists,
    userLists,
    userList,
  };
};
