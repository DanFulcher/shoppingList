import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {colours} from '../styles';
import {useNavigation} from '@react-navigation/native';

import SingleList from '../components/SingleList';
import CircleButton from '../components/Button/CircleButton';

const ListView = props => {
  const {lists} = props.route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.body}>
      <ScrollView>
        {lists &&
          lists.map((singleList, index) => (
            <SingleList key={index} list={singleList} />
          ))}
      </ScrollView>
      {lists.length === 1 && (
        <CircleButton
          onPress={() => navigation.navigate('Add Item', {list: lists[0]})}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 20,
    backgroundColor: colours.background,
    height: '100%',
  },
});

export default ListView;
