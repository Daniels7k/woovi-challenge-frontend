import React from "react";

import { useFragment } from "react-relay";
import graphql from "babel-plugin-relay/macro";

const User = (props) => {
  const users = useFragment(
    graphql`
      fragment User_users on User {
        name
      }
    `,
    props.users
  );

  console.log("userComponent", users);
  return <div>hello world</div>;
};

export default User;
