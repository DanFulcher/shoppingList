import {useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
export default list => {
  // const navigation = useNavigation();
  const [itemOrder, setItemOrder] = useState(list.items);
  const [editMode, setEditMode] = useState(false);
  const reorderItems = data => {
    setEditMode(true);
    console.log(data);
    // console.log(listID);
    setItemOrder(data);
    // fetch(
    //   `https://shopping-list-app-e9d27.firebaseio.com/lists/${listID}/items.json`,
    //   {
    //     method: 'PUT',
    //     body: JSON.stringify(itemOrder),
    //   },
    // )
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  };

  return {
    itemOrder,
    editMode,
    setEditMode,
    reorderItems,
  };
};
