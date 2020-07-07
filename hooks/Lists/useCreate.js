import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

export default () => {
  const [listName, setListName] = useState('');
  const [validate, setValidate] = useState(false);

  const navigation = useNavigation();

  const userID = auth().currentUser._user.uid;
  const timestamp = moment().valueOf();

  const onNameChange = text => {
    setValidate(false);
    setListName(text);
  };
  const createList = usersLists => {
    if (listName !== '') {
      fetch('https://shopping-list-app-e9d27.firebaseio.com/lists.json', {
        method: 'POST',
        body: JSON.stringify({
          name: listName,
          items: [],
          author: userID,
          created_at: timestamp,
        }),
      })
        .then(res => res.json())
        .then(parsedRes => {
          const id = parsedRes.name;
          const list = [
            {
              id: id,
              name: listName,
            },
          ];
          navigation.navigate('List View', {lists: list});
          return id;
        })
        .then(id => {
          fetch(
            `https://shopping-list-app-e9d27.firebaseio.com/users/${userID}/lists/${usersLists}.json`,
            {
              method: 'PUT',
              body: JSON.stringify({
                id: id,
              }),
            },
          );
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
