import React from 'react';
import {View, StyleSheet} from 'react-native';
import {colours} from '../styles';

import useCreate from '../hooks/Lists/useCreate';

import Input from '../components/Forms/Fields/Input';
import Button from '../components/Button';

const NewList = props => {
  const {onNameChange, createList, validate} = useCreate();

  return (
    <View style={styles.body}>
      <Input
        label="Name your list"
        error={validate}
        errorMessage="You should name your list"
        placeholder="eg. My List"
        onChange={text => onNameChange(text)}
      />
      <Button
        title="Create List"
        onPress={() => createList(props.route.params.numberOfLists)}
      />
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
