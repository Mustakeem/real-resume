import React, { useState } from 'react';

import { useStyletron } from 'baseui';
import { ArrowUp } from 'baseui/icon';
import { Button, StyledLoadingSpinnerContainer } from 'baseui/button';
import { Plus, Search } from 'baseui/icon';
import { Navigation } from 'baseui/side-navigation';
import { ListItem, ListItemLabel } from 'baseui/list';
import { useHistory,useLocation } from 'react-router-dom';

const SideNav = () => {
  const [css, theme] = useStyletron();
  const history = useHistory();
  const location = useLocation();

  // const [activeItemId, setActiveItemId] = useState('/overview');
  return (
    <ul
      className={css({
        width: '14vw',
        paddingLeft: 0,
        paddingRight: 0,
        position: 'fixed'
      })}
    >
      <Navigation
        items={[
          {
            title: 'JobSearch',
            itemId: '/jobSearch',
          }
        ]}
        activeItemId={location.pathname}
        onChange={({ event,item}) => {
          // prevent page reload
          event.preventDefault();
          history.push(item.itemId);
        }}
  
        overrides={{
          NavItem: {
            style: ({ $theme }) => {
              return {
                fontWeight: 'bold',
                marginTop: '6px'
              };
            }
          }
        }}
      />
      <div
        className={css({
          borderTop: `1px solid ${theme.colors.mono500}`,
          marginTop: '10px',
          marginBottom: '10px',
        })}
      />
      <Navigation
        items={[
          {
            title: 'Overview',
            itemId: '/overview',
            subNav: [
              { title: 'Basic Info', itemId: '/basicInfo' },
              {
                title: 'Work Experience',
                itemId: '/workExperience',
              },
              {
                title: 'Education',
                itemId: '/education',
              },
              {
                title: 'Portfolio',
                itemId: '/portfolio',
              },
            ]
          }
        ]}
        activeItemId={location.pathname}
        onChange={({ event,item}) => {
          // prevent page reload
          event.preventDefault();
          history.push(item.itemId);
        }}
        overrides={{
          NavItem: {
            style: ({ $theme }) => {
              return {
                fontWeight: 'bold',
                marginTop: '6px'
              };
            }
          }
        }}
      />
      <div
        className={css({
          borderTop: `1px solid ${theme.colors.mono500}`,
          marginTop: '10px',
          marginBottom: '10px',
        })}
      />
      <Button
        type='submit'
        endEnhancer={() => <Plus size={22} />}
        overrides={{
          BaseButton: {
            style: {
              width: '100%'
            }
          }
        }}
      >
        Create Resume
      </Button>
      <div
        className={css({
          borderTop: `1px solid ${theme.colors.mono500}`,
          marginTop: '10px',
          marginBottom: '10px',
        })}
      />

    </ul>

  )
}

export default SideNav;