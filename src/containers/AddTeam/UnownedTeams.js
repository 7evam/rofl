import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "@fontsource/open-sans";
import useApi from "../../hooks/useApi";
import RosterComponent from "../../components/Roster";
import Loading from "../../components/Loading";
import useHydration from "../../hooks/useHydration";
import {
  Section,
  Select,
  Label,
  Headline,
  ActionButton,
  Container,
  League,
  LeagueSelector,
  slotData,
  SlotRow,
  Th,
  TitleRow,
  Td,
  Table,
  CashContainer
} from "./components";
import useAddTeam from "./useAddTeam";
import { convertRealToRofl, convertDateObjToReadable } from "../../utils";
import { toast } from "react-toastify";

function UnownedTeams({
  league,
  setLeague,
  unownedTeams,
  handleClaim,
  handleAdd,
  handleAction,
  firstLeagueToShow
}) {
  const { activeYears, currentDate, sportTeams, deadlines } = useSelector(
    (state) => ({
      ...state.sportReducer
    })
  );

  const deadline = activeYears[2022][league] ? deadlines[2022][league][activeYears[2022][league].roflMonth].deadline : deadlines[2022][league][currentDate.realMonth - 4].deadline
  const today = new Date()
  const waiverPeriodEnded = new Date(deadline) < today 

  // console.log('here is deadline and today')
  // console.log(new Date(deadline))
  // console.log(today)

  const getUnownedActionButton = (leagueId, team) => {
    // return claim if 3 days before end of real month or season start, add otherwise
    const claim = (
      <ActionButton onClick={() => handleClaim(team)}>{"Claim"}</ActionButton>
    );
    // const claim = <ActionButton onClick={() => toast('Feature coming soon')}>{"Claim"}</ActionButton>
    const add = (
      <ActionButton onClick={() => handleAdd(team)}>{"Add"}</ActionButton>
    );

    if (!activeYears[2022][leagueId]) return claim;
    const currentRoflMonth = activeYears[2022][leagueId].roflMonth;
    if (
      currentDate.date < deadlines[2022][leagueId][currentRoflMonth].deadline
    ) {
      return claim;
    } else {
      return add;
    }
  };

  return (
    <div>
      <LeagueSelector>
        {firstLeagueToShow === 1 ? (
          <League selected={league == 1} onClick={() => setLeague(1)}>
            MLB
          </League>
        ) : null}
        {firstLeagueToShow <= 2 ? (
          <League selected={league == 2} onClick={() => setLeague(2)}>
            NFL
          </League>
        ) : null}

        <League selected={league == 3} onClick={() => setLeague(3)}>
          NHL
        </League>
        <League selected={league == 4} onClick={() => setLeague(4)}>
          NBA
        </League>
      </LeagueSelector>
      <p>
        Waiver period { waiverPeriodEnded ? 'ended' : 'ends'}{" "}
        {convertDateObjToReadable(deadline)}
        {" "}at 4 am EST
      </p>
      <p>{waiverPeriodEnded ? 'Adding a team from this league will immediately add it to your current roster and it ' : 
      'Placing a bid on a team from this league will queue it for processing on the waiver deadline and, if you win, the team '} 
      will be available starting RoFL month {activeYears[2022][league].roflMonth}
      </p>
      <TitleRow>
        <Th style={{ width: "200px" }}>Team</Th>
        <Th style={{ width: "70px" }}>Action</Th>
      </TitleRow>
      {unownedTeams[league].map((team) => (
        <SlotRow key={team}>
          <Td>
            {sportTeams[league][team].city} {sportTeams[league][team].name}
          </Td>
          <Td>{getUnownedActionButton(league, team)}</Td>
        </SlotRow>
      ))}
    </div>
  );
}

export default UnownedTeams;