import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colours} from '../styles';

import useUpdate from '../hooks/Lists/useUpdate';

import Input from '../components/Forms/Fields/Input';
import Button from '../components/Button';

const NewList = props => {
  const name = props.route.params.listName;
  const id = props.route.params.listID;
  const {listName, onNameChange, validateName, editList} = useUpdate(name);

  return (
    <View style={styles.body}>
      <Input
        label="Rename your list"
        error={validateName}
        errorMessage="You should name your list"
        placeholder="eg. My List"
        onChange={text => onNameChange(text)}
        value={listName}
      />
      <Button title="Rename List" onPress={() => editList(id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: colours.background,
    padding: 15,
    height: '100%',
  },
});

export default NewList;
