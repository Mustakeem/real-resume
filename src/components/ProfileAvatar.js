import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { logoutUser } from '../store/actions';

import { Avatar } from 'baseui/avatar';
import { Button, KIND, SHAPE } from 'baseui/button';
import { StatefulPopover, PLACEMENT } from 'baseui/popover';
import { StatefulMenu } from 'baseui/menu';
import { useStyletron } from 'styletron-react';


const items = [
  { label: 'Logout' },
];

const Dropdown = (props) => {
  const dispatch = useDispatch();
  const [css, theme] = useStyletron();

  const [isOpen, setIsOpen] = useState(false);
  return (
    <StatefulPopover
      isOpen={isOpen}
      onClick={() => setIsOpen(s => !s)}
      overrides={{
        Arrow: {
          style: ({ $theme }) => ({
            backgroundColor: $theme.colors.white,
          }),
        }
      }}
      content={
        <StatefulMenu
          items={items}
          onItemSelect={() => dispatch(logoutUser())}
          overrides={{
            Option: {
              style: ({ $theme }) => {
                return {
                  ':hover': {
                    backgroundColor: 'black',
                    color: 'white'
                  }
                };
              }
            }
          }}
        />
      }
      placement={PLACEMENT.bottom}
      showArrow
      returnFocus
      autoFocus
    >
      <Button
        {...props}
        kind={KIND.tertiary}
        shape={SHAPE.round}
      >
        {props.children}
      </Button>
    </StatefulPopover>
  );
};

const ProfileAvatar = () => {
  return (
    <Dropdown>
      <Avatar
        name="Jane Doe"
        size="scale1200"
        src="https://api.adorable.io/avatars/285/11@adorable.io.png"
        overrides={{
          Root: {
            style: ({$theme}) => ({
              border: 'solid 2px black'
            }),
          },
        }}
      />
    </Dropdown>
  );
}


function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}

export default connect(mapStateToProps)(ProfileAvatar);