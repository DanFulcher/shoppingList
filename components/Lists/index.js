import React, {useCallback} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import useLists from '../../hooks/Lists/useLists';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import CircleButton from '../Button/CircleButton';
import List from './List';
import {colours} from '../../styles';

const Lists = props => {
  const {
    multiSelMode,
    onOpen,
    openMulti,
    onSelectMulti,
    onDeselect,
    getAllLists,
    userLists,
    selectedLists,
  } = useLists();
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      getAllLists();
    }, [getAllLists]),
  );
  console.log(userLists);
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
      </View>
      {multiSelMode ? (
        <CircleButton
          type="chevron-right"
          onPress={() => openMulti(selectedLists)}
        />
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
