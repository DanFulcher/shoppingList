import React from 'react';
import {View, StyleSheet} from 'react-native';

import List from './List';

const Lists = props => {
  const userLists = [
    {
      name: 'My First List',
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
  return (
    <View style={styles.listContainer}>
      {userLists &&
        userLists.map((list, index) => (
          <List key={index} data={userLists[index]} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default Lists;
