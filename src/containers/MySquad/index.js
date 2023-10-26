import React, { useState, useEffect } from 'react';
import useRoster from './useRoster';
import MonthTicker from '../../components/MonthTicker';
import RosterComponent from '../../components/Roster';
import '@fontsource/open-sans';
import {
  Container, Slot, SelectButton, BannerMessage, MonthButton, MonthContainer, YearContainer, ScrollMenu, ScrollMenuContainer, ScrollMenuLink, ScrollMenuButton, SubmitChangesButton, TeamName,
} from './components';
import Loading from '../../components/Loading';

function Roster() {
  const {
    selectedYear,
    roflMonth,
    roster,
    currentOrganization,
    changeRoster,
    selectedSlot,
    areRostersEqual,
    setRoflMonth,
    handleSubmit,
    activeRoflMonths,
    updateOneMonth,
    setUpdateOneMonth,
    name,
    loadingRoster,
  } = useRoster();

  const isActiveTable = {};

  activeRoflMonths
    && selectedYear
    && Object.keys(activeRoflMonths[selectedYear]).forEach((month) => {
      isActiveTable[month.leagueId] = month.roflMonth;
    });

  const endOfSeasonDrop = (roflMonth === 8) ? true : false

  const currentMonthRoster = roster
    ? roster[`${roflMonth}-${selectedYear}`]
    : null;

  return (
    <Container>
      {!loadingRoster && roster && currentOrganization && currentMonthRoster && selectedYear ? (
        <div>
          <TeamName>
            <p>
              <b>{currentOrganization.team_name}</b>
              {' '}
              - managed by
              {' '}
              <b>
                {' '}
                {name}
              </b>
            </p>
          </TeamName>

          <hr />
          {/* {activeYearArray.length === 2 ? (
            <YearSelector
              activeYearArray={activeYearArray}
              setSelectedRoflYear={setSelectedRoflYear}
              selectedRoflYear={selectedRoflYear}
              handleYearChange={handleYearChange}
            />
          ) : (
            <YearContainer>
              <p>
                MSFA Year:
                {selectedRoflYear}
              </p>
            </YearContainer>
          )} */}

          <MonthTicker
            roflMonth={roflMonth}
            setRoflMonth={setRoflMonth}
            selectedYear={selectedYear}
          />
          {/* <MonthContainer>
            <p>RoFL Month: {roflMonth}</p>
          </MonthContainer> */}
          <RosterComponent
            selectedYear={selectedYear}
            currentMonthRoster={currentMonthRoster}
            roflMonth={roflMonth}
            isActiveTable={isActiveTable}
            changeRoster={changeRoster}
            selectedSlot={selectedSlot}
            readOnly={false}
            endOfSeasonDrop={endOfSeasonDrop}
          />
          {areRostersEqual ? null : (
            <BannerMessage>
              <label>
                <input type="checkbox" value={updateOneMonth} onClick={() => setUpdateOneMonth(!updateOneMonth)} />
                Update only this month
              </label>
              <br />
              You have unsaved changes
              <SubmitChangesButton onClick={handleSubmit}>
                Submit
              </SubmitChangesButton>
            </BannerMessage>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default Roster;
