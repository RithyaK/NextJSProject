import React, { useState } from "react";
import styled from "styled-components";
import { db } from "@/firestore/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { dateOf30DaysAgo, dateOf7DaysAgo } from "@/utils/date";
import { add } from "date-fns";
import { theme } from "@/theme";
import { userDataAccount } from "@/pages/myaccount";
import Ranking from "./Ranking";
type SidebarProps = {
  usersData: userDataAccount[];
};

const Sidebar = ({ usersData }: SidebarProps) => {
  // const dateOf30DaysAgo = Date.now() - 2592000000;
  // const dateOf7DaysAgo = Date.now() - 864000000;
  const topUsersActive = usersData
    .toSorted(
      (userA, userB) => userB.totalCorrectAnswered - userA.totalCorrectAnswered
    )
    .splice(0, 7);

  const topUsersAverage = usersData
    .toSorted((userA, userB) => userB.average - userA.average)
    .splice(0, 7);
  return (
    <SidebarStyled>
      <Ranking title="TOP ACTIVE USER" ranking={topUsersActive} />
      <Ranking title="TOP AVERAGE ANSWER" ranking={topUsersAverage} />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. At vero
        nesciunt, repudiandae inventore ullam non obcaecati esse pariatur,
        reprehenderit harum corrupti fugiat praesentium voluptate hic eos enim
        possimus quibusdam a ipsa consectetur ad. Dolorem animi ad, corporis
        quis hic recusandae molestiae saepe alias voluptatibus pariatur quas
        consequatur excepturi aliquam natus repellendus incidunt quae, et aut
        qui soluta eligendi! Corrupti, inventore.
      </p>
    </SidebarStyled>
  );
};

export default Sidebar;

const SidebarStyled = styled.div`
  background-color: ${theme.colors.green};
  border-right: 2px solid black;
  overflow: auto;
`;
