import React, { useState } from 'react';

import { Tabs, Tab } from 'baseui/tabs';
import { FormControl } from 'baseui/form-control';
import { HeadingMedium, HeadingXXLarge } from 'baseui/typography';
import { Input } from 'baseui/input';
import { PhoneInput, COUNTRIES } from 'baseui/phone-input';

import { Negative } from './NegativeInput';
import { useStyletron } from 'baseui';

const FormWrapper = ({ children }) => {
    const [css, theme] = useStyletron();
    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                width: '50vw',
                margin: '15vh 0',
                height: 'auto',
                padding: '5% 10%',
                backgroundColor: theme.colors.mono200
            })}
        >
            {children}
        </div>
    );

};


const BasicInfo = () => {

    const [isValid, setIsValid] = useState(false);
    const [isVisited, setIsVisited] = useState(false);
    const shouldShowError = !isValid && isVisited;
    //👉 set inputs
    const [email, setEmail] = useState('test@mail.com');
    const [firstName, setFirstName] = useState('test');
    const [lastName, setLastName] = useState('test');
    const [phoneNumber, setPhoneNumber] = useState('8655311078');
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [otherUrl, setOtherUrl] = useState('');
    //👉 phone input
    const [text, setText] = useState('');
    const [country, setCountry] = useState(COUNTRIES.IN);

    return (
        <div>
            <FormWrapper>
                <HeadingMedium>Personal details</HeadingMedium>
                <FormControl
                    label='Email address'
                >
                    <Input
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        onBlur={() => setIsVisited(true)}
                        overrides={shouldShowError ? { After: Negative } : {}}
                        type='email'
                        required
                    />
                </FormControl>
                <FormControl
                    label='First name'
                >
                    <Input
                        placeholder='Enter your firstname'
                        value={firstName}
                        onChange={(e) => { setFirstName(e.target.value) }}
                        overrides={shouldShowError ? { After: Negative } : {}}
                        type='text'
                        required
                    />
                </FormControl>
                <FormControl
                    label='Last name'
                >
                    <Input
                        placeholder='Enter your lastname'
                        value={lastName}
                        onChange={(e) => { setLastName(e.target.value) }}
                        overrides={shouldShowError ? { After: Negative } : {}}
                        type='text'
                        required
                    />
                </FormControl>
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
                        onChange={(e) => { setPhoneNumber(e.target.value) }}

                    />
                </FormControl>
            </FormWrapper>
            <hr />
            <FormWrapper>
                <HeadingMedium>social links</HeadingMedium>
                <FormControl
                    label='Linkedin url'
                >
                    <Input
                        placeholder='Enter your linkedin url'
                        value={linkedinUrl}
                        onChange={(e) => { setLinkedinUrl(e.target.value) }}
                        onBlur={() => setIsVisited(true)}
                        overrides={shouldShowError ? { After: Negative } : {}}
                        type='url'
                    />
                </FormControl>
                <FormControl
                    label='Github url'
                >
                    <Input
                        placeholder='Enter your github url'
                        value={githubUrl}
                        onChange={(e) => { setGithubUrl(e.target.value) }}
                        onBlur={() => setIsVisited(true)}
                        overrides={shouldShowError ? { After: Negative } : {}}
                        type='url'
                    />
                </FormControl>
                <FormControl
                    label='Other url'
                >
                    <Input
                        placeholder='Enter your other url'
                        value={otherUrl}
                        onChange={(e) => { setOtherUrl(e.target.value) }}
                        onBlur={() => setIsVisited(true)}
                        overrides={shouldShowError ? { After: Negative } : {}}
                        type='url'
                    />
                </FormControl>

            </FormWrapper>

        </div>
    )
}

export default BasicInfo;