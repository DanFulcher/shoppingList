import {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
export default list => {
  const [items, setItems] = useState(list.items);
  const [editMode, setEditMode] = useState(false);

  const reorderItems = async data => {
    setItems(data);
    try {
      const jsonValue = await AsyncStorage.getItem('lists');
      const currentLists = jsonValue != null ? JSON.parse(jsonValue) : [];

      let currentList = currentLists.findIndex(
        element => element.id === list.id,
      );
      currentLists[currentList].items = data;
      try {
        const newLocalLists = JSON.stringify(currentLists);
        await AsyncStorage.setItem('lists', newLocalLists);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    items,
    setItems,
    reorderItems,
    editMode,
    setEditMode,
  };
};
