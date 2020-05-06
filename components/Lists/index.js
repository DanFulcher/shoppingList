import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import useLists from '../../hooks/Lists/useLists';
import {useNavigation} from '@react-navigation/native';

import CircleButton from '../Button/CircleButton';
import List from './List';
import {colours} from '../../styles';

const Lists = props => {
  const {
    multiSelMode,
    onOpen,
    onSelectMulti,
    onDeselect,
    clearSel,
    getLists,
    userLists,
    selectedLists,
  } = useLists();
  const navigation = useNavigation();
  useEffect(() => {
    getLists();
  }, [getLists]);
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
              onOpen={() => onOpen(list)}
              onSelectMulti={() => onSelectMulti(list)}
              onDeselect={() => onDeselect(list.id)}
              selectedLists={selectedLists}
            />
          ))}
        {/* {userLists.length < 0 ? (
          userLists.map((list, index) => (
            <List
              key={index}
              data={list}
              multiSelMode={multiSelMode}
              onSelectMulti={() => onSelectMulti(list)}
              onDeselect={() => onDeselect(list.id)}
              selectedLists={selectedLists}
            />
          ))
        ) : (
          <Text style={styles.noLists}>
            You currently have no lists. Click the "+" icon below to create your
            first list.
          </Text>
        )} */}
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
  noLists: {
    color: colours.white,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Lists;
