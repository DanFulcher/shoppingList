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
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerContent from './components/DrawerContent';
import ListStack from './stacks/ListsStack';
import Profile from './pages/Profile';

import {colours} from './styles';

const Drawer = createDrawerNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerType="slide"
          drawerStyle={{
            backgroundColor: colours.lighterBg,
          }}
          drawerContent={props => <DrawerContent {...props} />}
          drawerContentOptions={{
            activeBackgroundColor: colours.primary,
            activeTintColor: colours.white,
            inactiveTintColor: colours.white,
            itemStyle: {
              marginVertical: 0,
              marginHorizontal: 0,
              borderRadius: 0,
              padding: 5,
            },
          }}>
          <Drawer.Screen name="Home" component={ListStack} />
          <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
