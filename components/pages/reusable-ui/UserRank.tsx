import React from "react";
import styled from "styled-components";
import { theme } from "@/theme";

const UserRank = ({ user, index, data }) => {
  return (
    <UserRankedStyled>
      <div className="containerleft-rank">
        <h3 className="usernameinfo">{user.username}</h3>
        {data && <p>{data}</p>}
      </div>
      <span className="classementIconNumber">{index + 1}</span>
    </UserRankedStyled>
  );
};

export default UserRank;

const UserRankedStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
  border-top: 1px solid black;
  .classementIconNumber {
    background-color: ${theme.colors.lightgreen};
    padding: 5px;
    border-radius: 50%;
  }
`;
