import React from 'react';

import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';


import ProfileAvatar from '../components/ProfileAvatar';

const Navbar = () => {

  return (
    <HeaderNavigation
      overrides={{
        Root: {
          style: ({ $theme }) => {
            return {
              height: '10vh',
              position:'fixed',
              zIndex:'1',
              width: '100vw',
              border: `solid 2px ${$theme.colors.primaryA}`,
              backgroundColor: $theme.colors.backgroundPrimary
            };
          }
        }
      }
      }
    >
      <NavigationList
        $align={ALIGN.left}
      >

      </NavigationList>
      <NavigationList $align={ALIGN.center} />
      <NavigationList $align={ALIGN.right}>
        <NavigationItem>
          <ProfileAvatar 

          />
        </NavigationItem>
        <NavigationItem>

        </NavigationItem>

      </NavigationList>
      <NavigationList $align={ALIGN.right}>

      </NavigationList>
    </HeaderNavigation>
  )
}




export default Navbar;