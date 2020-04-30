import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import useLists from '../../hooks/Lists/useLists';
import {useNavigation} from '@react-navigation/native';

import CircleButton from '../Button/CircleButton';
import List from './List';

const Lists = props => {
  const {
    multiSelMode,
    onSelectMulti,
    onDeselect,
    clearSel,
    userLists,
    selectedLists,
  } = useLists();
  const navigation = useNavigation();
  return (
    <>
      {multiSelMode && (
        <View style={styles.multiSelectbar}>
          <Text style={styles.multiSelectbar__text}>
            {selectedLists.length} List{selectedLists.length > 1 && 's'}{' '}
            Selected
          </Text>
        </View>
      )}
      <View style={styles.listContainer}>
        {userLists &&
          userLists.map((list, index) => (
            <List
              key={index}
              data={list}
              multiSelMode={multiSelMode}
              onSelectMulti={() => onSelectMulti(list)}
              onDeselect={() => onDeselect(list.id)}
              selectedLists={selectedLists}
            />
          ))}
      </View>
      {multiSelMode ? (
        <CircleButton type="cross" onPress={() => clearSel()} />
      ) : (
        <CircleButton
          type="plus"
          onPress={() => navigation.navigate('New List')}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  multiSelectbar: {
    marginBottom: 20,
  },
  multiSelectbar__text: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Lists;
