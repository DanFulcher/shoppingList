import React, {useRef, useEffect} from 'react';
import {Animated, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {colours} from '../../styles';

const MultiSelOptions = props => {
  const growAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(growAnim, {
      toValue: 110,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Animated.View
      style={[
        styles.MultiSelOptions,
        {
          height: growAnim,
          opacity: fadeAnim,
        },
      ]}>
      <View style={styles.option}>
        <Text style={styles.option__text}>Clear Selection</Text>
        <TouchableOpacity onPress={props.clearSel} style={[styles.Button]}>
          <Icon name="cross" size={20} color={colours.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.option}>
        <Text style={styles.option__text}>Delete Lists</Text>
        <TouchableOpacity onPress={props.delLists} style={[styles.Button]}>
          <Icon name="trash" size={20} color={colours.primary} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  MultiSelOptions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 100,
    right: 20,
  },
  option: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
  option__text: {
    marginRight: 10,
  },
  Button: {
    backgroundColor: colours.white,
    padding: 15,
    borderRadius: 50,
    width: 50,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MultiSelOptions;
