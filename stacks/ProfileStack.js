import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Hamburger from '../components/Hamburger';

import Profile from '../pages/Profile';
import EditUser from '../pages/EditUser';
import {colours} from '../styles';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Profile}
      screenOptions={{
        headerStyle: {
          backgroundColor: colours.primary,
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerLeft: () => <Hamburger />,
        }}
      />
      <Stack.Screen name="Edit User" component={EditUser} />
    </Stack.Navigator>
  );
};
export default ProfileStack;
