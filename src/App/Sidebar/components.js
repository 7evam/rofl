import React from "react";
import {NavLink} from "react-router-dom";
import styled from 'styled-components';
import {red, blue, mediumBlue, lightBlue} from '../../constants/style'

export const NavGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 220px;
`;

export const SideBar = styled.div`
  z-index: 100;
  height: 100vh;
`;

export const Nav = styled.nav`
  grid-area: nav;
  background-color: ${mediumBlue};
  border-radius: 10px;
  margin-right: 10px;
  height: 100vh;

`;

export const Logo = styled.img`
  width: 220px;
`

export const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  color: ${red};
  padding: 10px 0;
  display: grid;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;

  grid-template:
    auto
    / [col-start] 20px [icon] 20px [spacer-col] 12px [label] 1fr [col-end] 20px;
  grid-area: auto / 1 / auto / 4;

  &.active {
    background-color: ${lightBlue};
    border-right: 3px solid ${blue};
    color: ${red};
    font-weight: 600;
  }

  &:not(.active):hover {
    background-color: #F8F8F8;
    color: blue;
  }
`;
