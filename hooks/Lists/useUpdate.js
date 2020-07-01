import {useState} from 'react';
import {Keyboard} from 'react-native';

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
  const updateList = list => {
    const items = list.items || [];
    tempList.forEach(element => {
      items.push(element);
    });
    fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/lists/${list.id}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          items: items,
          updated_at: timestamp,
        }),
      },
    ).then(() => {
      if (list.items) {
        navigation.navigate('List View', {
          lists: [list],
        });
      } else {
        fetch(
          `https://shopping-list-app-e9d27.firebaseio.com/lists/${
            list.id
          }.json`,
        )
          .then(res => res.json())
          .then(parsedRes => {
            parsedRes.id = list.id;
            navigation.navigate('List View', {
              lists: [parsedRes],
            });
          });
      }
    });
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
