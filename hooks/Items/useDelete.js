import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
export default () => {
  const navigation = useNavigation();
  const deleteItem = async (list, item) => {
    try {
      const jsonValue = await AsyncStorage.getItem('lists');
      const currentLists = jsonValue != null ? JSON.parse(jsonValue) : [];
      const listItems = currentLists[list].items;
      listItems.splice(item, 1);
      try {
        const newLocalLists = JSON.stringify(currentLists);
        await AsyncStorage.setItem('lists', newLocalLists);
        navigation.navigate('List View', {
          lists: [currentLists[list]],
        });
      } catch (e) {
        // saving error
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    deleteItem,
  };
};
