import React from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {colours} from '../styles';

import useUpdate from '../hooks/Lists/useUpdate';

import Input from '../components/Forms/Fields/Input';
import Button from '../components/Button';
import CircleButton from '../components/Button/CircleButton';
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

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      keyboardShouldPersistTaps="handled">
      <View style={styles.body}>
        <View style={styles.form}>
          <Input
            label="Item Name"
            error={validateName}
            errorMessage="Give your item a name"
            onChange={text => onNameChange(text)}
            value={itemName}
            onSubmitEditing={() => addToList()}
          />
          <Button title="Add to List" onPress={() => addToList()} />
        </View>
        {listUpdated && (
          <>
            <Text style={styles.successMessage}>
              {tempList[tempList.length - 1].name} has been added to your list.
              Click the tick icon to return to your list. Or add more items.
            </Text>
            <CircleButton
              type="done"
              size={30}
              onPress={() => updateList(props.route.params.list)}
            />
          </>
        )}
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
  successMessage: {
    color: colours.dark,
    textAlign: 'center',
  },
});

export default AddItem;
