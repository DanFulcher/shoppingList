/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MyLists from './pages/MyLists';
import NewList from './pages/NewList';
import ListView from './pages/ListView';
import AddItem from './pages/AddItem';
import {colours} from './styles';
const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: colours.background,
              borderBottomColor: colours.primary,
              borderBottomWidth: 2,
            },
            headerTintColor: '#fff',
          }}>
          <Stack.Screen name="My Lists" component={MyLists} />
          <Stack.Screen
            name="New List"
            component={NewList}
            gestureEnabled={true}
            gestureDirection="horizontal"
          />
          <Stack.Screen
            name="List View"
            component={ListView}
            options={({route}) => ({title: route.params.list.name})}
          />
          <Stack.Screen
            name="Add Item"
            component={AddItem}
            options={({route}) => ({list: route.params.list})}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
