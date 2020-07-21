import {useState} from 'react';
import {Keyboard} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
export default () => {
  const [itemName, setItemName] = useState('');
  const [itemQuant, setItemQuant] = useState(1);
  const [validateName, setValidateName] = useState(false);
  const [validateQuant, setValidateQuant] = useState(false);

  const [tempList, setTempList] = useState([]);
  const [listUpdated, setListUpdated] = useState(false);

  const navigation = useNavigation();
  const timestamp = moment().valueOf();

  const onNameChange = text => {
    setValidateName(false);
    setItemName(text);
  };
  const onQuantChange = number => {
    setValidateQuant(false);
    setItemQuant(number);
  };
  const addToList = () => {
    Keyboard.dismiss();
    if (itemName !== '') {
      setTempList([
        ...tempList,
        {
          name: itemName,
          quantity: parseFloat(itemQuant),
          checked: false,
        },
      ]);
      setItemName('');
      setItemQuant(1);
      setListUpdated(true);
    } else {
      setValidateName(true);
    }
  };
  const updateList = async list => {
    try {
      const jsonValue = await AsyncStorage.getItem('lists');
      const currentLists = jsonValue != null ? JSON.parse(jsonValue) : [];

      if (currentLists[list].items) {
        tempList.forEach(tempListItem => {
          currentLists[list].items.push(tempListItem);
        });
      } else {
        currentLists[list].items = tempList;
      }
      currentLists[list].updated_at = timestamp;
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
  };
  return {
    itemName,
    itemQuant,
    onNameChange,
    onQuantChange,
    updateList,
    validateName,
    validateQuant,
    tempList,
    addToList,
    listUpdated,
  };
};
