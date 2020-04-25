import React from 'react';
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
import Project from '../../components/Project';


const itemProps = {
  // backgroundColor: '',
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
        height: '100vh',
        border: `solid 2px ${$theme.colors.primaryA}`,
        marginTop: '0px',
        backgroundColor: 'white',
        zIndex: '1',
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
            <Route exact path='/'>
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
            <Route path='/projects'>
              <Project />
            </Route>
          </Switch>
        </FlexGridItem>

      </FlexGrid>
    </div>

  )
}


export default Dashboard;