import React from 'react';
import {ScrollView, Alert, StyleSheet} from 'react-native';
import {DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';

const DrawerContent = props => {
  return (
    <ScrollView>
      <DrawerItemList {...props} />
      {props.loggedIn ? (
        <DrawerItem
          {...props}
          label="Sign Out    "
          onPress={() =>
            Alert.alert(
              'Sign Out',
              'Are you sure you would like to sign out?',
              [
                {
                  text: 'Yes',
                  onPress: () =>
                    auth()
                      .signOut()
                      .then(() => {
                        props.navigation.reset({
                          index: 0,
                          routes: [{name: 'My Lists'}],
                        });
                      }),
                },
                {
                  text: 'No',
                },
              ],
            )
          }
          style={styles.drawerItem}
        />
      ) : (
        <>
          <DrawerItem
            {...props}
            label="Create an account   "
            onPress={() => props.navigation.navigate('Login')}
            style={styles.drawerItem}
          />
          <DrawerItem
            {...props}
            label="Sign In    "
            onPress={() => props.navigation.navigate('Login')}
            style={styles.drawerItem}
          />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    marginHorizontal: 0,
    paddingLeft: 5,
  },
});

export default DrawerContent;
