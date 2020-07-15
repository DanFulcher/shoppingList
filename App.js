/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import SplashScreen from 'react-native-splash-screen';

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import auth from '@react-native-firebase/auth';

import DrawerContent from './components/DrawerContent';
import ListsStack from './stacks/ListsStack';
import ProfileStack from './stacks/ProfileStack';

import {colours} from './styles';

const Drawer = createDrawerNavigator();

const App: () => React$Node = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = userName => {
    setUser(userName);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerType="slide"
          drawerStyle={{
            backgroundColor: colours.lighterBg,
          }}
          drawerContent={props => (
            <DrawerContent {...props} loggedIn={user ? true : false} />
          )}
          drawerContentOptions={{
            activeBackgroundColor: colours.primary,
            activeTintColor: colours.white,
            inactiveTintColor: colours.dark,
            itemStyle: {
              marginVertical: 0,
              marginHorizontal: 0,
              borderRadius: 0,
              padding: 5,
            },
          }}>
          <Drawer.Screen name="My Lists" component={ListsStack} />
          {user && <Drawer.Screen name="Profile" component={ProfileStack} />}
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
