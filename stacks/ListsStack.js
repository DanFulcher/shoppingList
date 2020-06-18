import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import Hamburger from '../components/Hamburger';
import ShareIcon from '../components/ShareIcon';

import Login from '../pages/Login';
import CreateAccount from '../pages/CreateAccount';
import MyLists from '../pages/MyLists';
import NewList from '../pages/NewList';
import ListView from '../pages/ListView';
import AddItem from '../pages/AddItem';
import ShareList from '../pages/ShareList';
import {colours} from '../styles';

const Stack = createStackNavigator();

const ListsStack = () => {
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
    <Stack.Navigator
      initialRouteName={!user ? 'Login' : 'My Lists'}
      screenOptions={{
        headerStyle: {
          backgroundColor: colours.primary,
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Create an Account" component={CreateAccount} />
      <Stack.Screen
        name="My Lists"
        component={MyLists}
        options={{
          headerLeft: () => <Hamburger />,
        }}
      />
      <Stack.Screen
        name="New List"
        component={NewList}
        gestureEnabled={true}
        gestureDirection="horizontal"
      />
      <Stack.Screen
        name="List View"
        component={ListView}
        options={({route}) => ({
          title: `${route.params.lists.length} List${
            route.params.lists.length > 1 ? 's' : ''
          }`,
          headerRight: () => <ShareIcon lists={route.params.lists} />,
        })}
      />
      <Stack.Screen
        name="Add Item"
        component={AddItem}
        options={({route}) => ({list: route.params.list})}
      />
      <Stack.Screen name="Share List" component={ShareList} />
    </Stack.Navigator>
  );
};
export default ListsStack;
