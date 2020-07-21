import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

export default () => {
  const [listName, setListName] = useState('');
  const [validate, setValidate] = useState(false);

  const navigation = useNavigation();

  const timestamp = moment().valueOf();

  const onNameChange = text => {
    setValidate(false);
    setListName(text);
  };

  const generateID = () => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const createList = async value => {
    if (listName !== '') {
      try {
        const jsonValue = await AsyncStorage.getItem('lists');
        const currentLists = jsonValue != null ? JSON.parse(jsonValue) : [];

        const newList = {
          name: listName,
          items: [],
          created_at: timestamp,
          id: generateID(),
        };
        currentLists.push(newList);
        try {
          const newLocalLists = JSON.stringify(currentLists);
          await AsyncStorage.setItem('lists', newLocalLists);
          navigation.navigate('List View', {
            lists: [newList],
            listNumber: currentLists.length - 1,
          });
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  return {
    onNameChange,
    createList,
    validate,
  };
};
