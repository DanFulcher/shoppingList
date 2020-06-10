import useLogin from '../User/useLogin';
export default navigation => {
  const {onLogout} = useLogin();
  const navItems = [
    {
      label: 'My Lists',
      onPress: navigation.navigate('My Lists'),
    },
    {
      label: 'My Lists',
      onPress: navigation.navigate('Profile'),
    },
    {
      label: 'Sign Out',
      onPress: onLogout(),
    },
  ];
  return {
    navItems,
  };
};
