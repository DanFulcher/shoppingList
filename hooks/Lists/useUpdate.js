import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import useLists from '../../hooks/Lists/useLists';
export default () => {
  const [itemName, setItemName] = useState('');
  const [itemQuant, setItemQuant] = useState(1);
  const [validateName, setValidateName] = useState(false);
  const [validateQuant, setValidateQuant] = useState(false);

  const {getLists} = useLists();

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
        `https://shopping-list-app-e9d27.firebaseio.com/lists/${list.id}/items/${list.items.length}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            name: itemName,
            quantity: parseFloat(itemQuant),
          }),
        },
      )
        .then(res => res.json())
        .then(refresh => {
          getLists();
        })
        .then(parsedRes => {
          navigation.goBack();
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
