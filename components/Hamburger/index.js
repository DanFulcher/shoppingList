import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Entypo';

const Hamburger = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerLeft}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Icon name="menu" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  headerLeft: {
    paddingLeft: 15,
  },
});
export default Hamburger;
