import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { useStyletron } from 'baseui';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';


import Navbar from '../../components/Navbar';
import SideNav from '../../components/SideNav';
import Overview from '../../components/Overview';
import BasicInfo from '../../components/BasicInfo';
import WorkExperience from '../../components/WorkExperience';
import Education from '../../components/Education';


const itemProps = {
  // backgroundColor: 'mono200',
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
        justifyContent: 'center',
        position: 'fixed',
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
        <FlexGridItem
          {...itemProps}
        >
          <Switch>
            <Route path='/overview'>
              <Overview />
            </Route>
            <Route path='/basicInfo'>
              <BasicInfo />
            </Route>
            <Route path='/workExperience'>
              <WorkExperience />
            </Route>
            <Route path='/education'>
              <Education />
            </Route>
          </Switch>
        </FlexGridItem>

      </FlexGrid>
    </div>

  )
}


export default Dashboard;