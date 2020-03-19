import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { connect, useDispatch } from 'react-redux';
import { signupUser } from '../store/actions';

import { validate as validateEmail } from 'email-validator';

import { useStyletron } from 'baseui';
import { PhoneInput, COUNTRIES } from 'baseui/phone-input';
import { ProgressSteps, Step } from 'baseui/progress-steps';
import { FormControl } from 'baseui/form-control';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { Alert } from 'baseui/icon';

function SpacedButton(props) {
    return (
        <Button
            {...props}
            overrides={{
                BaseButton: {
                    style: ({ $theme }) => ({
                        marginLeft: $theme.sizing.scale200,
                        marginRight: $theme.sizing.scale200,
                        marginTop: $theme.sizing.scale200,
                    }),
                },
            }}
        />
    );
}

function Negative() {
    const [css, theme] = useStyletron();
    return (
        <div
            className={css({
                display: 'flex',
                alignItems: 'center',
                paddingRight: theme.sizing.scale500,
                color: theme.colors.negative400,
            })}
        >
            <Alert size='18px' />
        </div>
    );
}

const SignupForm = ({ isAuthenticated, loginError }) => {
    const dispatch = useDispatch();

    const [css, theme] = useStyletron();
    const [current, setCurrent] = useState(0);

    //👉 phone input
    const [text, setText] = useState('');
    const [country, setCountry] = useState(COUNTRIES.IN);

    //👉 Input and errors useStates
    // const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isVisited, setIsVisited] = useState(false);
    const shouldShowError = !isValid && isVisited;

    //👉 Handlers

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const state = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber
    };


    const handleSubmit = () => {
        const { email, password, firstName, lastName, phoneNumber } = state;
        dispatch(signupUser(email, password, firstName, lastName, phoneNumber));
    };


    if (isAuthenticated) {
        return <Redirect to='/' />;
    } else {
        return (
            <ProgressSteps current={current}
                overrides={{
                    Root: {
                        style: () => {
                            return {
                                width: '30vw',
                            }
                        }
                    },
                    Title: {
                        style: ({ $theme }) => {
                            return {
                                fontSize: $theme.sizing.scale700
                            }
                        }
                    }
                }}
            >
                <Step title='Create account'>
                    <div className={css({ ...theme.typography.font200 })}>
                        Fill out your details below
                     </div>
                    <FormControl
                        label='Email address'
                    >
                        <Input
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => { validateEmail(setEmail(e.target.value)) }}
                            onBlur={() => setIsVisited(true)}
                            overrides={shouldShowError ? { After: Negative } : {}}
                            type='email'
                            required
                        />
                    </FormControl>
                    <FormControl
                        label='Password'
                        caption={'Enter atleast 6 characters'}
                    >
                        <Input
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            onBlur={() => setIsVisited(false)}
                            overrides={shouldShowError ? { After: Negative } : {}}
                            type='password'
                            required
                        />
                    </FormControl>
                    <SpacedButton onClick={() => setCurrent(0)} disabled>
                        Previous
                    </SpacedButton>
                    <SpacedButton
                        onClick={() => setCurrent(1)}
                    >
                        Next
                    </SpacedButton>
                </Step>

                <Step title='Personal details'>
                    <div className={css({ ...theme.typography.font200 })}>
                        It helps in your resume
                    </div>
                    <FormControl
                        label='First Name'
                    >
                        <Input
                            placeholder='Enter your first name'
                            value={firstName}
                            onChange={(e) => { setFirstName(e.target.value) }}
                            onBlur={() => setIsVisited(false)}
                            overrides={shouldShowError ? { After: Negative } : {}}
                            type='text'
                        />
                    </FormControl>
                    <FormControl
                        label='Last Name'
                    >
                        <Input
                            placeholder='Enter your last name'
                            value={lastName}
                            onChange={(e) => { setLastName(e.target.value) }}
                            onBlur={() => setIsVisited(false)}
                            overrides={shouldShowError ? { After: Negative } : {}}
                            type='text'
                        />
                    </FormControl>
                    <SpacedButton onClick={() => setCurrent(0)}>
                        Previous
                    </SpacedButton>
                    <SpacedButton onClick={() => setCurrent(2)}>
                        Next
                    </SpacedButton>
                </Step>
                <Step title='Contact Info'>
                    <div className={css({ ...theme.typography.font300 })}>
                        Almost done..
                    </div>
                    <FormControl
                        label='Phone number'
                    >
                        <PhoneInput
                            text={text}
                            country={country}
                            onBlur={() => setIsVisited(false)}
                            overrides={shouldShowError ? { After: Negative } : {}}
                            onTextChange={event => {
                                setText(event.currentTarget.value);
                            }}
                            onCountryChange={(event) => {
                                setCountry(event.option);
                            }}
                            value={phoneNumber}
                            onChange={(e)=>{setPhoneNumber(e.target.value)}}

                        />
                    </FormControl>
                    <SpacedButton onClick={() => setCurrent(1)}>
                        Previous
                     </SpacedButton>
                    <SpacedButton
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Submit
                    </SpacedButton>
                </Step>
            </ProgressSteps>

        )
    }
};

function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default connect(mapStateToProps)(SignupForm);

