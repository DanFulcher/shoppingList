import React from 'react';
import {ActivityIndicator} from 'react-native';
import {colours} from '../../styles';

const Loading = props => {
  return <ActivityIndicator color={colours.primary} size="large" />;
};
export default Loading;
