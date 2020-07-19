import React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {colours} from '../styles';
import {useNavigation} from '@react-navigation/native';

import SingleList from '../components/SingleList';
import CircleButton from '../components/Button/CircleButton';

const ListView = props => {
  const {lists} = props.route.params;
  const {listNumber} = props.route.params;
  const navigation = useNavigation();
  const multiView = lists.length > 1;
  return (
    <View style={styles.body}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={true}
        data={lists}
        renderItem={({item, index}) => (
          <SingleList
            key={index}
            list={item}
            listID={listNumber}
            multiView={multiView}
          />
        )}
        snapToAlignment={'start'}
        snapToInterval={360}
        decelerationRate={'fast'}
        pagingEnabled
        ListFooterComponent={
          multiView && (
            <View style={styles.swipteInstructions}>
              <Text>{'Swipe here to scroll between lists >>>>'}</Text>
            </View>
          )
        }
        ListFooterComponentStyle={styles.multiView__textContainer}
        keyExtractor={(item, index) => `list-${index}`}
      />
      {!multiView && (
        <CircleButton
          onPress={() =>
            navigation.navigate('Add Item', {
              listNumber,
            })
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingBottom: 0,
    backgroundColor: colours.background,
    height: '100%',
  },
  multiView__textContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 40,
  },
  swipteInstructions: {
    paddingHorizontal: 15,
  },
});

export default ListView;
