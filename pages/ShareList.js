import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import SearchInput, {createFilter} from 'react-native-search-filter';
import useUser from '../hooks/User/useUser';

import {colours} from '../styles';

const ShareList = props => {
  const [term, setTerm] = useState('');
  const {getUsers, users} = useUser();
  const KEYS_TO_FILTERS = ['name', 'email'];
  useFocusEffect(
    useCallback(() => {
      getUsers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  const searchUpdated = sTerm => {
    setTerm(sTerm);
  };
  const filteredUsers = users.filter(createFilter(term, KEYS_TO_FILTERS));
  return (
    <View style={styles.body}>
      <SearchInput
        onChangeText={sTerm => {
          searchUpdated(sTerm);
        }}
        style={styles.searchInput}
        placeholder={`Type a name or email to share ${
          props.route.params.lists.length > 1 ? 'these lists' : 'this list'
        } with them`}
      />
      <ScrollView>
        {term !== '' &&
          filteredUsers.map(user => {
            return (
              <TouchableOpacity onPress={() => alert(user.name)} key={user.id}>
                <View>
                  <Text>{user.name}</Text>
                  <Text style={styles.emailSubject}>{user.email}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 15,
    backgroundColor: colours.background,
    height: '100%',
  },
  pageTitle: {
    fontSize: 21,
    color: colours.dark,
    marginBottom: 10,
  },
});
export default ShareList;
