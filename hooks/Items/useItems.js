import {useState} from 'react';
export default list => {
  const [itemOrder, setItemOrder] = useState(list.items);
  const [editMode, setEditMode] = useState(false);
  const reorderItems = data => {
    setItemOrder(data);
  };

  return {
    itemOrder,
    setItemOrder,
    reorderItems,
    editMode,
    setEditMode,
  };
};
