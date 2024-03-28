import React from "react";
import styled from "styled-components";

const UserRank = ({ user }) => {
  return (
    <UserRankedStyled>
      <h3 className="usernameinfo">{user.username}</h3>
      {/* <div className="userinfo"> */}
      <p>score :{user.score}</p>
      <p>{user.createdAt.split("T")[0]}</p>
      {/* </div> */}
    </UserRankedStyled>
  );
};

export default UserRank;

const UserRankedStyled = styled.div`
  padding: 10px 10px;
  border: 1px solid black;
  text-align: center;
  /* .userinfo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  } */
`;
