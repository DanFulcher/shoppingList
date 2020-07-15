import {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

export default () => {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(auth().currentUser ? true : false);
  }, []);
  const currentUserID = auth().currentUser
    ? auth().currentUser._user.uid
    : null;
  const getMe = () => {
    fetch(
      `https://shopping-list-app-e9d27.firebaseio.com/users/${currentUserID}.json`,
    )
      .then(res => res.json())
      .then(parsedRes => {
        setUser({
          name: parsedRes.name,
          email: parsedRes.email,
          id: currentUserID,
        });
      })
      .catch(err => console.log(err));
  };
  const getUser = userID => {
    fetch(`https://shopping-list-app-e9d27.firebaseio.com/users/${userID}.json`)
      .then(res => res.json())
      .then(parsedRes => {
        setUser({
          name: parsedRes.name,
          email: parsedRes.email,
          id: userID,
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
    currentUserID,
    isLoggedIn,
  };
};
