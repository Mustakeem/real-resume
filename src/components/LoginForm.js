import React from 'react';

import { Card, StyledBody, StyledAction } from "baseui/card";
import { FormControl } from 'baseui/form-control';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';

const LoginForm = () => {
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
            <form>
                <StyledBody>
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
                        caption={'Forgot password ?'}
                    >
                        <Input
                            placeholder='Enter your password'
                            type='password'
                        />
                    </FormControl>
                </StyledBody>
                <StyledAction>
                    <Button
                        overrides={{
                            BaseButton: { style: { width: "100%" } }
                        }}
                    >
                        Login
                </Button>
                </StyledAction>

            </form>
        </Card>
    )


};

export default LoginForm;

