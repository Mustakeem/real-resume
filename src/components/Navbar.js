import React from 'react';

import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem as NavigationItem,
  StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';


import Logo from '../assets/Logo';
import ProfileAvatar from '../components/ProfileAvatar';

const Navbar = () => {

  return (
    <HeaderNavigation
      overrides={{
        Root: {
          style: ({ $theme }) => {
            return {
              height: '10vh',
            };
          }
        }
      }
      }
    >
      <NavigationList
        $align={ALIGN.left}
      >
        <NavigationItem>
          <Logo height='67' width='74' />
        </NavigationItem>
      </NavigationList>
      <NavigationList $align={ALIGN.center} />
      <NavigationList $align={ALIGN.right}>
        <NavigationItem>
          <ProfileAvatar />
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