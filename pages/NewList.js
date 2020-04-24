import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {colours} from '../styles';

import Input from '../components/Forms/Fields/Input';
import Button from '../components/Button';

const NewList = props => {
  const [listName, setListName] = useState('');
  const [validate, setValidate] = useState(false);

  const onNameChange = text => {
    setValidate(false);
    setListName(text);
  };
  const createList = () => {
    if (listName !== '') {
      fetch('https://shopping-list-app-e9d27.firebaseio.com/lists.json', {
        method: 'POST',
        body: JSON.stringify({
          name: listName,
          items: [],
        }),
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
      setListName('');
    } else {
      setValidate(true);
    }
  };
  return (
    <View style={styles.body}>
      <Input
        label="Name your list"
        error={validate}
        errorMessage="You should name your list"
        placeholder="eg. My List"
        onChange={text => onNameChange(text)}
      />
      <Button title="Create List" onPress={() => createList()} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: colours.background,
    padding: 20,
    height: '100%',
  },
});

export default NewList;
