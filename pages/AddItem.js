import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {colours} from '../styles';

import useUpdate from '../hooks/Items/useCreate';

import Input from '../components/Forms/Fields/Input';
import Button from '../components/Button';
const AddItem = props => {
  const {
    itemName,
    onNameChange,
    validateName,
    updateList,
    addToList,
    listUpdated,
    tempList,
  } = useUpdate();
  const {listNumber} = props.route.params;
  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      keyboardShouldPersistTaps="handled">
      {listUpdated && (
        <View style={styles.successBanner}>
          <Text style={styles.successBanner__message}>
            {tempList[tempList.length - 1].name} has been added to your list.
          </Text>
          <TouchableOpacity
            style={styles.successBanner__done}
            onPress={() => updateList(listNumber)}>
            <Text style={styles.successBanner__done__text}>Done</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.body}>
        <View style={styles.form}>
          <Input
            label="Item Name"
            error={validateName}
            errorMessage="Name your item"
            onChange={text => onNameChange(text)}
            value={itemName}
            onSubmitEditing={() => addToList()}
          />
          <Button
            title={tempList.length ? 'Add another item' : 'Add item'}
            onPress={() => addToList()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  body: {
    backgroundColor: colours.background,
    padding: 15,
    height: '100%',
  },
  form: {
    marginBottom: 20,
  },
  successBanner: {
    backgroundColor: colours.lighterBg,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  successBanner__message: {
    color: colours.dark,
    width: '70%',
  },
  successBanner__done: {
    width: '25%',
  },
  successBanner__done__text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colours.primary,
    width: '100%',
    textAlign: 'right',
  },
});

export default AddItem;
