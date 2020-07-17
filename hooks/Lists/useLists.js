import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const [multiSelMode, setMultiSelMode] = useState(false);
  const [selectedLists, setSelectedLists] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const getLocalLists = async () => {
    setLoading(true);
    try {
      const localLists = await AsyncStorage.getItem('lists');
      setUserLists(localLists != null ? JSON.parse(localLists) : []);
    } catch (e) {
      console.log(e);
    }
    console.log('Done.');
    setLoading(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    getLocalLists();
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
    userLists,
    setUserLists,
    refreshing,
    onRefresh,
    loading,
  };
};
