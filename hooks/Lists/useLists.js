import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const [multiSelMode, setMultiSelMode] = useState(false);
  const [selectedLists, setSelectedLists] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [userList, setUserList] = useState({});
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const getLocalLists = async () => {
    try {
      const localLists = await AsyncStorage.getItem('lists');
      setUserLists(localLists != null ? JSON.parse(localLists) : []);
    } catch (e) {
      console.log(e);
    }
    console.log('Done.');
  };

  const getList = id => {
    fetch(`https://shopping-list-app-e9d27.firebaseio.com/lists/${id}.json`)
      .then(res => res.json())
      .then(parsedRes => {
        setUserList({
          name: parsedRes.name,
          items: parsedRes.items ? parsedRes.items : [],
          id: id,
          author: parsedRes.author,
          created_at: parsedRes.created_at,
          updated_at: parsedRes.updated_at || undefined,
        });
      })
      .catch(err => console.log(err));
  };

  const getLists = lists => {
    setUserLists([]);
    let listsArray = [];
    fetch('https://shopping-list-app-e9d27.firebaseio.com/lists.json')
      .then(res => res.json())
      .then(parsedRes => {
        lists.forEach(list => {
          for (const [key, value] of Object.entries(parsedRes)) {
            if (key === list.id) {
              listsArray.push({
                id: key,
                name: value.name,
                items: value.items ? value.items : [],
                author: value.author,
                created_at: value.created_at,
                updated_at: value.updated_at || undefined,
              });
            }
          }
        });
        setUserLists(listsArray);
        setLoading(false);
      });

    return userLists;
  };

  const getUsersLists = async () => {
    setLoading(true);
    const userID = auth().currentUser._user.uid;
    const response = await fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/users/${userID}.json`,
    );
    const json = await response.json();
    if (json.lists) {
      getLists(json.lists);
    } else {
      setLoading(false);
      return userLists;
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getUsersLists();
    wait(2000).then(() => setRefreshing(false));
  };

  const onOpen = (list, index) => {
    const lists = [list];
    navigation.navigate('List View', {
      lists,
      listNumber: index,
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
    getLocalLists,
    getList,
    getLists,
    getUsersLists,
    userLists,
    setUserLists,
    userList,
    refreshing,
    onRefresh,
    loading,
  };
};
