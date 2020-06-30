import {useNavigation} from '@react-navigation/native';
export default () => {
  const navigation = useNavigation();
  const deleteItem = (list, item) => {
    fetch(`https://shopping-list-app-e9d27.firebaseio.com/lists/${list}.json`)
      .then(res => res.json())
      .then(parsedRes => {
        parsedRes.id = list;
        parsedRes.items.splice(item, 1);
        fetch(
          `https://shopping-list-app-e9d27.firebaseio.com/lists/${list}/items.json`,
          {
            method: 'PUT',
            body: JSON.stringify(parsedRes.items),
          },
          navigation.navigate('List View', {lists: [parsedRes]}),
        );
      });
  };

  return {
    deleteItem,
  };
};
