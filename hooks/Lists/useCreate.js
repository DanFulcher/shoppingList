import {useState} from 'react';
export default () => {
  const [listName, setListName] = useState('');
  const [validate, setValidate] = useState(false);

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
          items: [],
        }),
      })
        .then(res => console.log(res))
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
