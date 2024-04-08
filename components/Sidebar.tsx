import React, { useState } from "react";
import styled from "styled-components";
import { db } from "@/firestore/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { dateOf30DaysAgo, dateOf7DaysAgo } from "@/utils/date";
import { add } from "date-fns";
import { UserData } from "@/pages/menu/[username]";
import { theme } from "@/theme";
import Ranking from "./reusable-ui/Ranking";
type SidebarProps = {
  allTimeRanking: UserData[];
};
// const allTimeDATA = [
//   {
//     score: 100,
//     username: "Totover",
//     createdAt: new Date(2024, 2, 15, 11, 45, 5, 123),
//   },
//   {
//     username: "JusToad",
//     score: 110,
//     createdAt: new Date(2020, 2, 5, 11, 45, 5, 123),
//   },
//   {
//     score: 79,
//     username: "Ortenz",
//     createdAt: new Date(2018, 1, 25, 11, 45, 5, 123),
//   },
//   {
//     username: "Tachi-Paypay",
//     score: 80,
//     createdAt: new Date(2024, 2, 12, 11, 45, 5, 123),
//   },
//   {
//     username: "ARthur78",
//     score: 71,
//     createdAt: new Date(2024, 2, 15, 11, 45, 5, 123),
//   },
//   {
//     score: 70,
//     username: "TheLeamsiii",
//     createdAt: new Date(2024, 2, 25, 11, 45, 5, 123),
//   },
//   {
//     username: "Solivann_",
//     score: 115,
//     createdAt: new Date(2022, 2, 26, 11, 45, 5, 123),
//   },
// ];

const Sidebar = ({ allTimeRanking }: SidebarProps) => {
  const dateOf30DaysAgo = Date.now() - 2592000000;
  const dateOf7DaysAgo = Date.now() - 864000000;
  const monthRanking = allTimeRanking.filter(
    (userRanked) => Date.parse(userRanked.createdAt) > dateOf30DaysAgo
  );
  const weekRanking = allTimeRanking.filter(
    (userRanked) => Date.parse(userRanked.createdAt) > dateOf7DaysAgo
  );
  return (
    <SidebarStyled>
      <Ranking title="All Time Ranking" ranking={allTimeRanking} />
      <Ranking title="Ranking of the month" ranking={monthRanking} />
      <Ranking title="Ranking of the week" ranking={weekRanking} />
    </SidebarStyled>
  );
};

export default Sidebar;

const SidebarStyled = styled.div`
  background-color: ${theme.colors.green};
  border-right: 2px solid black;
  overflow: auto;
`;
