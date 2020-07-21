import React from 'react';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';

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
import EditItem from '../pages/EditItem';

const Stack = createStackNavigator();

const ListsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'My Lists'}
      screenOptions={{
        headerStyle: {
          backgroundColor: colours.primary,
        },
        headerTintColor: colours.white,
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
        options={({route, navigation}) => ({
          title: `${route.params.lists.length} List${
            route.params.lists.length > 1 ? 's' : ''
          }`,
          headerLeft: props => (
            <HeaderBackButton
              {...props}
              onPress={() => navigation.navigate('My Lists')}
            />
          ),
          headerRight: () => <ShareIcon lists={route.params.lists} />,
        })}
      />
      <Stack.Screen
        name="Add Item"
        component={AddItem}
        options={({route}) => ({
          list: route.params.list,
        })}
      />
      <Stack.Screen name="Edit Item" component={EditItem} />
      <Stack.Screen name="Share List" component={ShareList} />
    </Stack.Navigator>
  );
};
export default ListsStack;
