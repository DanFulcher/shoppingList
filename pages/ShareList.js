import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import SearchInput from 'react-native-search-filter';
import Label from '../components/Forms/Fields/Label';
import FilterResults from '../components/FilterResults';
import useShare from '../hooks/Lists/useShare';

import {colours} from '../styles';

const ShareList = props => {
  const {term, filteredUsers, searchUpdated} = useShare();
  return (
    <View style={styles.body}>
      <View style={styles.inputContainer}>
        <Label
          text={`Share ${
            props.route.params.lists.length > 1
              ? `${props.route.params.lists.length} Lists`
              : `${props.route.params.lists[0].name}`
          } with...`}
        />
        <SearchInput
          onChangeText={sTerm => {
            searchUpdated(sTerm);
          }}
          style={styles.searchInput}
          placeholder="Search by name or email"
        />
      </View>
      <ScrollView>
        {term !== '' && (
          <FilterResults
            results={filteredUsers}
            lists={props.route.params.lists}
          />
        )}
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
  inputContainer: {
    backgroundColor: colours.lighterBg,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  searchInput: {
    borderBottomWidth: 1,
  },
});
export default ShareList;
