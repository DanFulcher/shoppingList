import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
export default (name, quantity) => {
  const [itemName, setItemName] = useState(name);
  const [itemQuant, setItemQuant] = useState(quantity);
  const [validateName, setValidateName] = useState(false);
  const [validateQuant, setValidateQuant] = useState(false);

  const navigation = useNavigation();

  const onNameChange = text => {
    setValidateName(false);
    setItemName(text);
  };
  const onQuantChange = number => {
    setValidateQuant(false);
    setItemQuant(number);
  };

  const checkItem = async (list, id, checked) => {
    try {
      const jsonValue = await AsyncStorage.getItem('lists');
      const currentLists = jsonValue != null ? JSON.parse(jsonValue) : [];
      const checkedItem = currentLists[list].items[id];
      checkedItem.checked = !checked;
      try {
        const newLocalLists = JSON.stringify(currentLists);
        await AsyncStorage.setItem('lists', newLocalLists);
      } catch (e) {
        // saving error
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editItem = async (list, id) => {
    if (itemName !== '') {
      try {
        const jsonValue = await AsyncStorage.getItem('lists');
        const currentLists = jsonValue != null ? JSON.parse(jsonValue) : [];
        let item = currentLists[list].items[id];
        item.name = itemName;
        item.quantity = parseFloat(itemQuant);
        try {
          const newLocalLists = JSON.stringify(currentLists);
          await AsyncStorage.setItem('lists', newLocalLists);
          navigation.navigate('List View', {
            lists: [currentLists[list]],
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
    onQuantChange,
    itemName,
    itemQuant,
    checkItem,
    editItem,
    validateName,
    validateQuant,
  };
};
