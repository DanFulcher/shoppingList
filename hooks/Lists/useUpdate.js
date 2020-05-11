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
        }/items/${list.items.length}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            name: itemName,
            quantity: parseFloat(itemQuant),
          }),
        },
      )
        .then(res => res.json())
        .then(parsedRes => {
          const id = parsedRes.name;
          const paresedList = {
            id: id,
          };
          navigation.navigate('List View', {
            paresedList,
          });
        })
        .catch(err => console.log(err));
      setItemName('');
    } else {
      setValidateName(true);
    }
  };

  return {
    onNameChange,
    onQuantChange,
    updateList,
    validateName,
    validateQuant,
  };
};
