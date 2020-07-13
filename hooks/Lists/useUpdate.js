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
      tempList.forEach(tempListItem => {
        currentLists[list].items.push(tempListItem);
      });
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

  const checkItem = (list, id, checked) => {
    fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/lists/${list}/items/${id}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          checked: !checked,
        }),
      },
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  const editItem = (list, id) => {
    fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/lists/${list}/items/${id}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          name: itemName,
          quantity: itemQuant,
        }),
      },
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  return {
    itemName,
    itemQuant,
    onNameChange,
    onQuantChange,
    updateList,
    checkItem,
    editItem,
    validateName,
    validateQuant,
    tempList,
    addToList,
    listUpdated,
  };
};
