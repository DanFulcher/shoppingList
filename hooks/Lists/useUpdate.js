import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
export default () => {
  const [itemName, setItemName] = useState('');
  const [itemQuant, setItemQuant] = useState(1);
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
  const updateList = list => {
    if (itemName !== '') {
      fetch(
        `https://shopping-list-app-e9d27.firebaseio.com/lists/${
          list.id
        }/items/${list.items ? list.items.length : 0}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            name: itemName,
            quantity: parseFloat(itemQuant),
          }),
        },
      )
        .then(res => console.log(res))
        .catch(err => console.log(err));
      setItemName('');
      const listsArray = [];
      fetch(
        `https://shopping-list-app-e9d27.firebaseio.com/lists/${list.id}.json`,
      )
        .then(res => res.json())
        .then(parsedRes => {
          listsArray.push({
            name: parsedRes.name,
            items: parsedRes.items ? parsedRes.items : [],
            id: list.id,
          });
          navigation.navigate('List View', {
            lists: listsArray,
          });
        });
    } else {
      setValidateName(true);
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

  return {
    onNameChange,
    onQuantChange,
    updateList,
    checkItem,
    validateName,
    validateQuant,
  };
};
