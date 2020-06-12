import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export default (name, email) => {
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);

  const currentUser = auth().currentUser._user.uid;
  console.log(userName);
  const navigation = useNavigation();

  const onNameChange = text => {
    setUserName(text);
  };
  const onEmailChange = text => {
    setUserEmail(text);
  };
  const updateUser = userID => {
    fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/users/${currentUser}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          name: userName,
          quantity: userEmail,
        }),
      },
    )
      .then(res => {
        console.log(res);
        navigation.navigate('Profile');
      })
      .catch(err => console.log(err));
  };
  return {
    updateUser,
    userName,
    userEmail,
    onNameChange,
    onEmailChange,
  };
};
