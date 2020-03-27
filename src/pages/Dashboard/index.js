import React, { Component } from 'react';

import { useStyletron } from 'baseui';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';


import Navbar from '../../components/Navbar';
import SideNav from '../../components/SideNav';
import Overview from '../../components/Overview';
import BasicInfo from '../../components/BasicInfo';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const itemProps = {
  backgroundColor: 'mono200',
  height: '100vh',
  display: 'flex',
  // alignItems: 'center',
  justifyContent: 'center',

};

const sideNavProps = {
  ...itemProps,
  overrides: {
    Block: {
      style: ({ $theme }) => ({
        borderRight: `solid 1px ${$theme.colors.mono500}`,
        marginTop: '0px',
        width: '15vw',
        flexGrow: 0,
      }),
    },
  },
};

const Dashboard = () => {
  const [css, theme] = useStyletron();

  return (
    <div>
      <Navbar />
      <FlexGrid
        flexGridColumnCount={2}
        flexGridColumnGap="scale800"
        flexGridRowGap="scale800"
      >
        <FlexGridItem
          {...sideNavProps}
        >
          <SideNav />
        </FlexGridItem>
              <Route path='/overview'>
                  <Overview/>
              </Route>

      </FlexGrid>
    </div>

  )
}


export default Dashboard;