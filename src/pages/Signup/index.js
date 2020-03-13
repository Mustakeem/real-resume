import React from 'react';

import { useStyletron } from 'baseui';
import { FlexGrid, FlexGridItem } from 'baseui/flex-grid';
import {H4} from 'baseui/typography'

import SignupForm from '../../components/SignupForm';
import Logo from '../../assets/Logo'

const itemProps = {
    display: 'flex',
    width: '50vw',
    alignItems: 'center',
    justifyContent: 'center',
};


const Signup = () => {
    return (
        <LayoutWrapper>

                    <SignupForm />

        </LayoutWrapper>

    );
};

const LayoutWrapper = ({ children }) => {
    const [css, theme] = useStyletron();
    return (
        <div
            className={css({
                display: 'flex',
                // height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10% 0',
            })}
        >
            {children}
        </div>
    );

};

export default Signup;
