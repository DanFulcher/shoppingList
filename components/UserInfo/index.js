import React from 'react';

import UserItem from './UserItem';

const userInfo = props => {
  return (
    <>
      <UserItem label="Name" value={props.user.name} />
      <UserItem label="Email" value={props.user.email} />
      <UserItem label="Lists" value={props.user.lists} />
    </>
  );
};
export default userInfo;
