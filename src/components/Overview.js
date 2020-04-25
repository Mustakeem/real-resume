import React, { useState } from 'react';

import { connect, useDispatch } from 'react-redux';

import { useStyletron } from 'baseui';
import {
    Display4,
    H6,
    Label1,
    H3,
    H4,
    H5,
    DisplaySmall,
    DisplayMedium,
    DisplayXSmall
} from 'baseui/typography';

import Microlink from '@microlink/react';
import Chilling from '../assets/chilling';

import DisplayWrapper from './DisplayWrapper';
import LinkWrapper from './LinkWrapper';
import Main from './Main';

const Card = ({ children }) => {
    const [css, theme] = useStyletron();

    return (
        <div
            className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `solid 2px ${theme.colors.mono900}`,
                borderStyle: 'dashed',
                padding: '5%',
                marginRight: '5vw'
            })}
        >
            {children}
        </div>
    )
}



const WelcomeDisplaySection = ({ children }) => {
    const [css, theme] = useStyletron();

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'row',
                width: '50vw'
                // backgroundColor: theme.colors.mono200
            })}
        >
            {children}
        </div>
    );

};


const Overview = () => {
    const [css,theme] = useStyletron();

    //👉 modal open and close
    const [isOpen, setOpen] = useState(false);

    //👉 input tags
    const [value, setValue] = React.useState('');
    const [tags, setTags] = React.useState([]);

    const addTag = (tag) => {
        setTags([...tags, tag]);
    };

    const removeTag = (tag) => {
        setTags(tags.filter(t => t !== tag));
    };

    const handleDisplay = () => {
        setOpen(false);
        console.log(tags);
    }

    const handleKeyDown = event => {
        switch (event.keyCode) {
            // Enter
            case 13: {
                if (!value) return;
                addTag(value);
                setValue('');
                return;
            }
            // Backspace
            case 8: {
                if (value || !tags.length) return;
                removeTag(tags[tags.length - 1]);
                return;
            }
        }
    };

    return (
        <Main>
            <WelcomeDisplaySection>
                <div
                    className={css({
                        display: 'flex',
                        flexDirection: 'column',
                    })}
                >
                    <DisplayXSmall>Hello,<br />Mustakeem</DisplayXSmall>
                    <H6>You can have a overview of your projects, skills and ratings. We consider projects based on your skills only</H6>
                </div>
                <Chilling
                    height='360'
                    width='924'
                />
            </WelcomeDisplaySection>
                            
            <DisplayWrapper>
                <LinkWrapper>
                    <Microlink url='https://www.pluralsight.com' size='large' />
                </LinkWrapper>
                <LinkWrapper>
                    <Microlink url='https://egghead.io/search?query=react%20js' size='large' />
                </LinkWrapper>
                <LinkWrapper>
                    <Microlink url='https://medium.com' size='large' />
                </LinkWrapper>
            </DisplayWrapper>

        </Main>

    );
}

export default Overview;

