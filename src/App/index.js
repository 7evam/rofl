import React, { useEffect } from "react";
import styled from "styled-components";
import { Redirect, Route, Switch } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useDispatch } from "react-redux";

import SideBar from "./Sidebar";
import TopBar from "./TopBar";

import MySquad from "../containers/MySquad";
import Dashboard from "../containers/Dashboard";
import Roster from "../containers/Roster";
import AddTeam from '../containers/AddTeam'
import RoflLeague from "../containers/RoflLeague";
import Scoring from '../containers/Scoring'

import Settings from "../containers/Settings";

import Loading from '../components/Loading'

import RenderModal from './RenderModal'

import {Container, ContentContainer} from "./components"


function App(props) {
  const dispatch = useDispatch();

  const { makeRequest, isLoading } = useApi();

  const getActiveMonths = async () => {
    const res = await makeRequest({
      method: "get",
      route: `/sports/active`
    });
    
    const parsedRes = res.body

    dispatch({
      type: "SET_ACTIVE_YEARS_AND_MONTHS",
      payload: {
        activeYears: parsedRes.activeYears,
        currentDate: parsedRes.currentDate
      }
    });
  };

  useEffect(() => {
    getActiveMonths();
  }, []);

  return isLoading ? (
    <Loading/>
  ) : (
    <Container>
      {/* <SideBar /> */}
      <TopBar />
      <ContentContainer>
      <Switch>
        <Route exact path="/">
          <Redirect to="/squad" />
        </Route>
        <Route exact path="/squad" component={MySquad} />
        {/* <Route exact path="/dashboard" component={Dashboard}/> */}
        {/* <Route exact path="/rosters" component={Roster} /> */}
        <Route path="/rofleague" component={RoflLeague} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/scoring" component={Scoring}/>
        
        <Route exact path="/add-team" component={AddTeam}/>
      </Switch>
      </ContentContainer>
      <RenderModal/>
    </Container>
  );
}

export default App;
