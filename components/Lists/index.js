import React from 'react';
import {Text, View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import useLists from '../../hooks/Lists/useLists';

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

  return (
    <>
      {multiSelMode && (
        <View style={styles.multiSelectbar}>
          <View>
            <Text style={styles.multiSelectbar__text}>
              {selectedLists.length} List{selectedLists.length > 1 && 's'}{' '}
              Selected
            </Text>
          </View>
          <View>
            <TouchableWithoutFeedback onPress={() => clearSel()}>
              <Text style={styles.multiSelectbar__text}>Clear Selected</Text>
            </TouchableWithoutFeedback>
          </View>
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
    display: 'flex',
    justifyContent: 'space-between',
  },
  multiSelectbar__text: {
    color: '#fff',
    fontSize: 21,
    width: '50%',
  },
});

export default Lists;
