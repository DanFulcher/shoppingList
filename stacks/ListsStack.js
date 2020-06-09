import React, {useState, useEffect} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Entypo';

import Login from '../pages/Login';
import CreateAccount from '../pages/CreateAccount';
import MyLists from '../pages/MyLists';
import NewList from '../pages/NewList';
import ListView from '../pages/ListView';
import AddItem from '../pages/AddItem';
import {colours} from '../styles';

const Stack = createStackNavigator();

const ListsStack = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const navigation = useNavigation();

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
          backgroundColor: colours.background,
          borderBottomColor: colours.primary,
          borderBottomWidth: 2,
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Create an Account" component={CreateAccount} />
      <Stack.Screen
        name="My Lists"
        component={MyLists}
        options={{
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <TouchableWithoutFeedback
                onPress={() => navigation.toggleDrawer()}>
                <Icon name="menu" size={30} color="#fff" />
              </TouchableWithoutFeedback>
            </View>
          ),
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
        })}
      />
      <Stack.Screen
        name="Add Item"
        component={AddItem}
        options={({route}) => ({list: route.params.list})}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  headerLeft: {
    paddingLeft: 15,
  },
});
export default ListsStack;
