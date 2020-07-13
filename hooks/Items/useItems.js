import {useState} from 'react';
export default list => {
  const [itemOrder, setItemOrder] = useState(list.items);
  const reorderItems = data => {
    setItemOrder(data);
    fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/lists/${
        list.id
      }/items.json`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
    )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return {
    itemOrder,
    reorderItems,
  };
};
