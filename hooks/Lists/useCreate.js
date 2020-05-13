import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
export default () => {
  const [listName, setListName] = useState('');
  const [validate, setValidate] = useState(false);

  const navigation = useNavigation();

  const onNameChange = text => {
    setValidate(false);
    setListName(text);
  };
  const createList = () => {
    if (listName !== '') {
      fetch('https://shopping-list-app-e9d27.firebaseio.com/lists.json', {
        method: 'POST',
        body: JSON.stringify({
          name: listName,
        }),
      })
        .then(res => res.json())
        .then(parsedRes => {
          const id = parsedRes.name;
          const lists = [
            {
              id: id,
              name: listName,
            },
          ];
          navigation.navigate('List View', {lists});
        })
        .catch(err => console.log(err));
      setListName('');
    } else {
      setValidate(true);
    }
  };

  return {
    onNameChange,
    createList,
    validate,
  };
};
