import React, { useState } from 'react';
import { connect, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import * as EmailValidator from 'email-validator';
import { loginUser } from "../store/actions";

import { useStyletron } from 'baseui'
import { Card, StyledBody, StyledAction } from "baseui/card";
import { FormControl } from 'baseui/form-control';
import { Alert } from 'baseui/icon';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';


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
            <Alert size="18px" />
        </div>
    );
}


const LoginForm = ({ isAuthenticated, loginError }) => {
    const dispatch = useDispatch();
    const [css, theme] = useStyletron();

    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isVisited, setIsVisited] = useState(false);
    const shouldShowError = !isValid && isVisited;

    const state = { email: "", password: "" };

    const handleSubmit = (props) => {
        const { email, password } = state;
        dispatch(loginUser(email, password));
    }

    const handleEmailChange = ({ target }) => {
        EmailValidator.validate(target.value);
        state.email = target.value;
    };

    const handlePasswordChange = ({ target }) => {
        state.password = target.value;
    };


    if (isAuthenticated) {
        return <Redirect to="/" />;
    } else {
        return (
            <Card
                overrides={{
                    Root: {
                        style: ({ $theme }) => {
                            return {
                                width: '50vh',
                            };
                        }
                    }
                }}
            >
                <StyledBody>
                    <FormControl
                        label='Email address'
                        error={
                            shouldShowError
                              ? 'Please input a valid email address'
                              : null
                          }
                    >
                        <Input
                            placeholder='Enter your email'
                            id='email'
                            onChange={handleEmailChange}
                            // value={value}
                            onBlur={() => setIsVisited(true)}
                            overrides={shouldShowError ? { After: Negative } : {}}
                            type="email"
                            required
                        />
                    </FormControl>
                    <FormControl
                        label='Password'
                        caption={'Forgot password ?'}
                    >
                        <Input
                            placeholder='Enter your password'
                            id='password'
                            type='password'
                            error={shouldShowError}
                            onChange={handlePasswordChange}
                            required
                        />
                    </FormControl>
                    {loginError && (
                        <div
                            className={css({
                                display: 'flex',
                                alignItems:'center',
                                justifyContent: 'center',
                                paddingRight: theme.sizing.scale500,
                                color: theme.colors.negative400,
                            })}
                        >
                            Invalid email or password
                        </div>
                    )}
                </StyledBody>
                <StyledAction>
                    <Button
                        type='submit'
                        onClick={handleSubmit}
                        overrides={{
                            BaseButton: { style: { width: "100%" } }
                        }}

                    >
                        Login
                    </Button>

                </StyledAction>

            </Card>
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



export default connect(mapStateToProps)(LoginForm);

