import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
export default () => {
  const navigation = useNavigation();
  const userID = auth().currentUser._user.uid;

  const deleteLists = lists => {
    lists.forEach(element => {
      fetch(
        `https://shopping-list-app-e9d27.firebaseio.com/users/${userID}/lists.json`,
      )
        .then(res => res.json())
        .then(parsedRes => {
          const delList = parsedRes.findIndex(
            returnedlist => returnedlist.id === element.id,
          );
          if (delList > -1) {
            parsedRes.splice(delList, 1);
          }
          fetch(
            `https://shopping-list-app-e9d27.firebaseio.com/users/${userID}/lists.json`,
            {
              method: 'PUT',
              body: JSON.stringify(parsedRes),
            },
          ).then(navigation.navigate('My Lists'));
        });
    });
  };

  return {
    deleteLists,
  };
};
