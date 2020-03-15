import React from 'react';

import { useStyletron } from 'baseui';

import SignupForm from '../../components/SignupForm';


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
