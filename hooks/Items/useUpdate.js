import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
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
    if (itemName !== '') {
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
        .then(() => {
          setItemName('');
          const listsArray = [];
          fetch(
            `https://shopping-list-app-e9d27.firebaseio.com/lists/${list}.json`,
          )
            .then(res => res.json())
            .then(parsedRes => {
              listsArray.push({
                name: parsedRes.name,
                items: parsedRes.items ? parsedRes.items : [],
                id: list,
              });
              navigation.navigate('List View', {
                lists: listsArray,
              });
            });
        })
        .catch(err => console.log(err));
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
