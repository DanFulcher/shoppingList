import React from 'react';
import {ScrollView, Alert} from 'react-native';
import {DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';

const DrawerContent = props => {
  return (
    <ScrollView>
      <DrawerItemList {...props} />
      <DrawerItem
        {...props}
        label="Sign Out"
        onPress={() =>
          Alert.alert('Sign Out', 'Are you sure you would like to sign out?', [
            {
              text: 'Yes',
              onPress: () =>
                auth()
                  .signOut()
                  .then(() => {
                    props.navigation.navigate('Login');
                  }),
            },
            {
              text: 'No',
            },
          ])
        }
      />
    </ScrollView>
  );
};

export default DrawerContent;
