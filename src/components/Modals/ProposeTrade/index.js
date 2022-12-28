import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import "@fontsource/open-sans";
import TeamSelect from "../TeamSelect";
import ReviewTrade from './ReviewTrade'
import {toast} from 'react-toastify'

function ProposeTrade() {

    const { props } = useSelector((state) => ({
        ...state.modalReducer
      }));

    const transformToCheckable = (roster) => {
        console.log("transforming this roster")
        console.log(roster)
        let checkableRoster = {}
        checkableRoster.cash = roster.cash
        Object.keys(roster).forEach(teamNum => {
            const team = roster[teamNum]
            console.log("here is team")
            console.log(team)
            if(team.teamId){
                checkableRoster[team.teamId] = {
                    checked: props.selectedTeam === team.teamId ? true : false,
                    val: team.val,
                    leagueId: team.leagueId
                }
            }
        })
        console.log('here is transformed roster')
        console.log(checkableRoster)
        return checkableRoster
    }
    

    

    const [stage, setStage] = useState('tradeFor')
    const [teamsForTrade, setTeamsForTrade] = useState({
        tradeFor: transformToCheckable(props.currentRoster),
        tradeAway: transformToCheckable(props.currentUserRoster)
    })   
    const [cash, setCash] = useState({
        tradeFor: null,
        tradeAway: null
    })

    const handleTeamClick = (teamId) => {
        const newTeamsForTrade = {...teamsForTrade}
        newTeamsForTrade[stage][teamId].checked = !newTeamsForTrade[stage][teamId].checked
        if(Object.values(newTeamsForTrade[stage]).filter(team => team.checked === true).length > 3){
            toast.error('You can trade a maximum of 3 teams')
            return
        } else {
            setTeamsForTrade(newTeamsForTrade)
        }
    }

    const handleCashValueChange = (value) => {
        console.log('value in handle change')
        console.log(value)
        if(value > teamsForTrade[stage].cash){
            console.log("user doesnt have that money")
        } else {
            let newCash = {...cash}
            newCash[stage] = value
            setCash(newCash)
        }
    }
    
    const getContent = (stage) => {
        switch(stage){
            case 'tradeFor':
                return <TeamSelect mode="tradeFor" handleCashValueChange={handleCashValueChange} cashValue={cash.tradeFor} handleTeamClick={handleTeamClick} setStage={setStage} checkedTeams={teamsForTrade['tradeFor']} />
            case 'tradeAway':
                return <TeamSelect mode="tradeAway" handleCashValueChange={handleCashValueChange} cashValue={cash.tradeAway} handleTeamClick={handleTeamClick} setStage={setStage} checkedTeams={teamsForTrade['tradeAway']}/>
            case 'reviewTrade':
                return <ReviewTrade setStage={setStage} teamsForTrade={teamsForTrade} cash={cash}/>
        }
    }
    
  return getContent(stage)
}

export default ProposeTrade;
