import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {colours} from '../styles';
import {useNavigation} from '@react-navigation/native';

import SingleList from '../components/SingleList';
import CircleButton from '../components/Button/CircleButton';

const ListView = props => {
  const {lists} = props.route.params;
  const navigation = useNavigation();
  const multiView = lists.length > 1;
  const getOffsets = items => {
    let offsets = [0];
    for (let i = 1; i <= items; i++) {
      offsets.push(310 * i);
    }
    return offsets;
  };
  return (
    <View style={styles.body}>
      <ScrollView
        horizontal={multiView}
        contentContainerStyle={{width: `${100 * lists.length}%`}}
        // pagingEnabled={multiView}
        decelerationRate="fast"
        snapToOffsets={getOffsets(lists.length)}
        showsHorizontalScrollIndicator={false}>
        {lists &&
          lists.map((singleList, index) => (
            <SingleList
              key={index}
              list={singleList}
              noOfLists={lists.length}
            />
          ))}
      </ScrollView>
      {!multiView && (
        <CircleButton
          onPress={() => navigation.navigate('Add Item', {list: lists[0]})}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 15,
    backgroundColor: colours.background,
    height: '100%',
  },
});

export default ListView;
