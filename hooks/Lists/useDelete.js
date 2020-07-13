import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
export default () => {
  const navigation = useNavigation();

  const deleteLists = async lists => {
    const jsonValue = await AsyncStorage.getItem('lists');
    const currentLists = jsonValue != null ? JSON.parse(jsonValue) : [];

    lists.forEach(async list => {
      try {
        const selectedList = currentLists.findIndex(
          element => element.id === list.id,
        );
        currentLists.splice(selectedList, 1);
      } catch (e) {
        console.log(e);
      }
    });

    console.log(currentLists);
    try {
      const newLocalLists = JSON.stringify(currentLists);
      await AsyncStorage.setItem('lists', newLocalLists);
      navigation.reset({
        index: 0,
        routes: [{name: 'My Lists'}],
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    deleteLists,
  };
};
