import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import userShare from '../../hooks/Lists/useShare';
import {colours} from '../../styles';

const FilterResaults = props => {
  const {shareList} = userShare();
  return (
    <View style={styles.resultsContainer}>
      {props.results.length ? (
        props.results.map(user => {
          return (
            <TouchableOpacity
              onPress={() => shareList(user, props.lists)}
              key={user.id}>
              <View style={styles.result}>
                <Text style={styles.result__name}>{user.name}</Text>
                <Text style={styles.result__email}>{user.email}</Text>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text>No users found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    backgroundColor: colours.lighterBg,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  result: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: colours.lessDark,
  },
  result__name: {
    fontSize: 16,
    marginBottom: 5,
  },
  result__email: {
    fontSize: 12,
  },
});

export default FilterResaults;
