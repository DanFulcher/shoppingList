import {useState} from 'react';

export default () => {
  const [multiSelMode, setMultiSelMode] = useState(false);
  const [selectedLists, setSelectedLists] = useState([]);

  const onSelectMulti = list => {
    setMultiSelMode(true);
    setSelectedLists([...selectedLists, list]);
  };

  const onDeselect = id => {
    setSelectedLists(selectedLists.filter(item => item.id !== id));
    if (selectedLists.length - 1 < 1) {
      setMultiSelMode(false);
    }
  };

  const clearSel = () => {
    setSelectedLists([]);
    setMultiSelMode(false);
  };

  const userLists = [
    {
      name: 'My First List',
      id: '12345',
      items: [
        {
          name: 'Brocolli',
        },
        {
          name: 'Oat Milk',
          desc: 'Oatly if possible. Found with the long life milks.',
        },
        {
          name: 'Beans',
        },
      ],
    },
    {
      name: 'Mums list',
      id: '23456',
      items: [
        {
          name: 'Spinach',
        },
        {
          name: 'Toilet Paper',
          desc: '4 ply',
        },
        {
          name: 'Tinned Fruit',
        },
        {
          name: 'Flour',
          desc: 'Self Raising',
        },
      ],
    },
    {
      name: 'Dads list',
      id: '34567',
      items: [
        {
          name: 'Peas',
        },
        {
          name: 'Tuna',
        },
        {
          name: 'Teabags',
          desc: 'Tetley',
        },
        {
          name: 'Instant Coffee',
        },
      ],
    },
  ];

  return {
    multiSelMode,
    setMultiSelMode,
    selectedLists,
    setSelectedLists,
    onSelectMulti,
    onDeselect,
    clearSel,
    userLists,
  };
};
