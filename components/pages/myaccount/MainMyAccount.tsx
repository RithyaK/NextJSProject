import { useUsernameContext } from "@/components/context/usernameContext";
import Link from "next/link";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "@/theme";
import { syncEmailDatabase } from "@/firestore/Data";
import MenuHistoryTest from "./MenuHistoryTest";
import MenuStatistics from "./MenuStatistics";
import MenuAccountInfo from "./MenuAccountInfo";
import { userDataAccount } from "@/pages/myaccount";
type MainMyAccountProps = {
  userDataAccount: userDataAccount;
};
const MainMyAccount = ({ userDataAccount }: MainMyAccountProps) => {
  const { username } = useUsernameContext();
  return (
    <MainMyAccountStyled>
      <Link href={`/menu/${username}`}>Retourner à l{"'"}accueil</Link>
      <h1>
        {username}
        {"'"}s account
      </h1>
      <MenuHistoryTest userDataAccount={userDataAccount} />
      <MenuStatistics userDataAccount={userDataAccount} />

      <MenuAccountInfo userDataAccount={userDataAccount} />
    </MainMyAccountStyled>
  );
};

export default MainMyAccount;

const MainMyAccountStyled = styled.div`
  .titledropdown {
    display: flex;
    align-items: center;
    background-color: ${theme.colors.darkgrey};
    gap: 15px;
    cursor: pointer;
    margin: 2px;
  }
  li {
    padding: 10px;
    border-bottom: 1px solid black;
    margin: 0 20px;
    list-style-type: none;
    display: flex;
    align-items: center;
  }
  li > * {
    margin-right: 20px;
  }
`;
