import React from "react";

const Home = () => {
  return <div></div>;
};

export default Home;

// import React from "react";

// import User from "../components/User";
// import { useLazyLoadQuery } from "react-relay/hooks";
// import graphql from "babel-plugin-relay/macro";

// const HomeQuery = graphql`
//   query HomeQuery {
//     getAllUsers {
//       email
//       ...User_user
//     }
//   }
// `;

// const Home = () => {
//   const response = useLazyLoadQuery(HomeQuery);
//   console.log("homeComponent", response);

//   return (
//     <div>
//       <User user={response.getAllUsers[0]} />
//     </div>
//   );
// };

// export default Home;
