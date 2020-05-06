import {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const [multiSelMode, setMultiSelMode] = useState(false);
  const [selectedLists, setSelectedLists] = useState([]);
  const [userLists, setUserLists] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getLists();
  }, [getLists]);

  const getLists = useCallback(() => {
    fetch('https://shopping-list-app-e9d27.firebaseio.com/lists.json')
      .then(res => res.json())
      .then(parsedRes => {
        const listsArray = [];
        for (const key in parsedRes) {
          listsArray.push({
            name: parsedRes[key].name,
            items: parsedRes[key].items ? parsedRes[key].items : [],
            id: key,
          });
        }
        setUserLists(listsArray);
      })
      .catch(err => console.log(err));
    return userLists;
  }, [userLists]);

  const onOpen = list => {
    navigation.navigate('List View', {
      list,
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
    onSelectMulti,
    onDeselect,
    clearSel,
    getLists,
    userLists,
  };
};
