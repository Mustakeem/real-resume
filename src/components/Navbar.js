import React from 'react';

import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationList,
    StyledNavigationItem
} from 'baseui/header-navigation';

const Navbar = () => {
    <HeaderNavigation>
        <StyledNavigationList $align={ALIGN.left}>
            <StyledNavigationItem>Uber</StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.center} />
        <StyledNavigationList $align={ALIGN.right}>
            <StyledNavigationItem>
                <StyledLink href="#basic-link1">
                    Tab Link One
                </StyledLink>
            </StyledNavigationItem>
            <StyledNavigationItem>
                <StyledLink href="#basic-link2">
                    Tab Link Two
                </StyledLink>
            </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.right}>
            <StyledNavigationItem>
                <Button>Get started</Button>
            </StyledNavigationItem>
        </StyledNavigationList>
    </HeaderNavigation>
);
}