import {useState} from 'react';
import auth from '@react-native-firebase/auth';

export default () => {
  const [user, setUser] = useState('');

  const useMe = () => {
    let userObj = auth().currentUser;

    setUser(userObj);
  };
  return {
    useMe,
    user,
  };
};
