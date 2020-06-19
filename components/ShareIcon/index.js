import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Entypo';

const ShareIcon = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerRight}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Share List', {lists: props.lists})}>
        <Icon name="share" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  headerRight: {
    paddingRight: 15,
  },
});
export default ShareIcon;
