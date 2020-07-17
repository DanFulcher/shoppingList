import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Hamburger from '../components/Hamburger';

import Notifications from '../pages/Notifications';
import {colours} from '../styles';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Notifications}
      screenOptions={{
        headerStyle: {
          backgroundColor: colours.primary,
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerLeft: () => <Hamburger />,
        }}
      />
    </Stack.Navigator>
  );
};
export default ProfileStack;
