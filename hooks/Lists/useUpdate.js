import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
export default (name, quantity) => {
  const [listName, setListName] = useState(name);
  const [validateName, setValidateName] = useState(false);

  const navigation = useNavigation();

  const onNameChange = text => {
    setValidateName(false);
    setListName(text);
  };

  const editList = async list => {
    if (listName !== '') {
      try {
        const jsonValue = await AsyncStorage.getItem('lists');
        const currentLists = jsonValue != null ? JSON.parse(jsonValue) : [];

        const currentIndex = currentLists.findIndex(
          element => element.id === list,
        );
        let currentList = currentLists[currentIndex];
        currentList.name = listName;
        try {
          const newLocalLists = JSON.stringify(currentLists);
          await AsyncStorage.setItem('lists', newLocalLists);
          navigation.navigate('List View', {
            lists: [currentLists[currentIndex]],
          });
        } catch (e) {
          // saving error
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return {
    onNameChange,
    listName,
    editList,
    validateName,
  };
};
