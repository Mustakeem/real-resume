import React, { useState } from 'react';

import { useStyletron } from 'baseui';
import { PhoneInput, COUNTRIES } from 'baseui/phone-input';
import { ProgressSteps, Step } from "baseui/progress-steps";
import { FormControl } from 'baseui/form-control';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';

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

const SignupForm = () => {
    const [current, setCurrent] = useState(0);
    const [css, theme] = useStyletron();

    const [text, setText] = useState('');
    const [country, setCountry] = useState(COUNTRIES.IN);

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
                        type='email'
                    />
                </FormControl>
                <FormControl
                    label='Password'
                    caption={'Enter atleast 6 characters'}
                >
                    <Input
                        placeholder='Enter your password'
                        type='password'
                    />
                </FormControl>
                <FormControl
                    label='Confirm password'
                >
                    <Input
                        placeholder='Re-enter your password'
                        type='password'
                    />
                </FormControl>
                <SpacedButton onClick={() => setCurrent(0)} disabled>
                    Previous
                </SpacedButton>
                <SpacedButton onClick={() => setCurrent(1)}>
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
                        type='text'
                    />
                </FormControl>
                <FormControl
                    label='Last Name'
                >
                    <Input
                        placeholder='Enter your last name'
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
            <Step title="Contact Info">
                <div className={css({ ...theme.typography.font300 })}>
                    Almost done..
                </div>
                <FormControl
                    label='Phone number'
                >
                    <PhoneInput
                        text={text}
                        country={country}
                        onTextChange={event => {
                            setText(event.currentTarget.value);
                        }}
                        onCountryChange={(event) => {
                            setCountry(event.option);
                        }}
                    />
                </FormControl>
                <SpacedButton onClick={() => setCurrent(1)}>
                    Previous
                 </SpacedButton>
                <SpacedButton disabled>Next</SpacedButton>
            </Step>
        </ProgressSteps>
    );
};

export default SignupForm;

