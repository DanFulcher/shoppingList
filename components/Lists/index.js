import React, {useCallback} from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import useLists from '../../hooks/Lists/useLists';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import CircleButton from '../Button/CircleButton';
import List from './List';
import {colours} from '../../styles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Lists = props => {
  const {
    multiSelMode,
    onOpen,
    openMulti,
    onSelectMulti,
    onDeselect,
    getAllLists,
    clearSel,
    userLists,
    selectedLists,
  } = useLists();
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      getAllLists();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  return (
    <>
      {multiSelMode && (
        <View style={styles.multiSelectbar}>
          <Text style={styles.multiSelectbar__text}>
            {selectedLists.length} List{selectedLists.length > 1 && 's'}{' '}
            Selected
          </Text>
          <TouchableWithoutFeedback onPress={() => clearSel()}>
            <Text style={styles.multiSelectbar__clear}>Clear selection</Text>
          </TouchableWithoutFeedback>
        </View>
      )}
      <ScrollView style={styles.listContainer}>
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
      </ScrollView>
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
  multiSelectbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  multiSelectbar__text: {
    color: '#fff',
    fontSize: 18,
  },
  multiSelectbar__clear: {
    color: '#fff',
    fontSize: 16,
  },
  noLists: {
    color: colours.white,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Lists;
