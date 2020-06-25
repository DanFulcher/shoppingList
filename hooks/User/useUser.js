import {useState} from 'react';
import auth from '@react-native-firebase/auth';

export default () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  const currentUser = auth().currentUser._user.uid;
  const getMe = () => {
    fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/users/${currentUser}.json`,
    )
      .then(res => res.json())
      .then(parsedRes => {
        setUser({
          name: parsedRes.name,
          email: parsedRes.email,
          lists: parsedRes.lists.length,
          id: currentUser,
        });
      })
      .catch(err => console.log(err));
  };
  const getUser = userID => {
    fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/users/${
        userID ? userID : currentUser
      }.json`,
    )
      .then(res => res.json())
      .then(parsedRes => {
        setUser({
          name: parsedRes.name,
          email: parsedRes.email,
          lists: parsedRes.lists.length,
          id: currentUser,
        });
      })
      .catch(err => console.log(err));
  };
  const getUsers = () => {
    fetch('https://shopping-list-app-e9d27.firebaseio.com/users.json')
      .then(res => res.json())
      .then(parsedRes => {
        const userArray = [];
        for (var key in parsedRes) {
          if (parsedRes.hasOwnProperty(key)) {
            userArray.push(parsedRes[key]);
          }
        }
        setUsers(userArray);
      })
      .catch(err => console.log(err));
  };
  return {
    user,
    users,
    getMe,
    getUser,
    getUsers,
  };
};
