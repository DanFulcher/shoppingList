import {useNavigation} from '@react-navigation/native';
export default () => {
  const navigation = useNavigation();

  const deleteLists = lists => {
    lists.forEach(element => {
      fetch(
        `https://shopping-list-app-e9d27.firebaseio.com/lists/${
          element.id
        }.json`,
        {
          method: 'DELETE',
        },
      )
        .then(res => res.json())
        .then(parsedRes => {
          navigation.navigate('My Lists');
        });
    });
  };

  return {
    deleteLists,
  };
};
