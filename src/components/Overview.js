import React, { useState } from 'react';

import { connect, useDispatch } from 'react-redux';

import { useStyletron } from 'baseui';
import { Input, StyledInput } from 'baseui/input';
import { Plus, ArrowRight, Delete } from 'baseui/icon';
import { Button, SIZE, SHAPE } from 'baseui/button';
import { Tag, VARIANT as TAG_VARIANT } from 'baseui/tag';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    FocusOnce,
} from 'baseui/modal';
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
import { FormControl } from 'baseui/form-control';

import Microlink from '@microlink/react';
import Chilling from '../assets/chilling';

import DisplayWrapper from './DisplayWrapper';
import LinkWrapper from './LinkWrapper';
import Main from './Main';



const SkillsDisplayWrapper = ({ children }) => {
    const [css, theme] = useStyletron();

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                width: '50vw',
                alignItems: 'center',
                border: `solid 2px ${theme.colors.mono900}`,
                borderStyle: 'dashed',
                marginTop: '10vh',
                // justifyContent: 'space-between',
                padding: '5%',
            })}
        >
            {children}
        </div>
    )
};


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





//👉 skills input
const InputReplacement = React.forwardRef(
    ({ tags, removeTag, ...restProps }, ref) => {
        const [css] = useStyletron();
        return (
            <div
                className={css({
                    flex: '1 1 0%',
                    flexWrap: 'wrap',
                    display: 'flex',
                    alignItems: 'center',
                })}
            >
                {tags.map((tag, index) => (
                    <Tag
                        variant={TAG_VARIANT.solid}
                        onActionClick={() => removeTag(tag)}
                        key={index}
                    >
                        {tag}
                    </Tag>
                ))}
                <StyledInput ref={ref} {...restProps} />
            </div>
        );
    },
);


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
            <SkillsDisplayWrapper>
                <H4>Add skills</H4>
                <Button
                
                    shape={SHAPE.round}
                    onClick={() => setOpen(s => !s)}
                >
                    <Plus />
                </Button>

                <Modal
                    onClose={() => setOpen(false)}
                    isOpen={isOpen}
                    overrides={{
                        Root: {
                            style: ({ $theme }) => {
                                return {
                                    // zIndex: '200'
                                };
                            }
                        }
                    }}
                    unstable_ModalBackdropScroll
                >

                    <ModalHeader>Add Skills</ModalHeader>

                    <ModalBody>
                        <FormControl
                            label='Skills'
                        >
                            <Input
                                placeholder={tags.length ? '' : 'Enter A Tag'}
                                value={value}
                                onChange={e => setValue(e.currentTarget.value)}
                                overrides={{
                                    Input: {
                                        style: { width: 'auto', flexGrow: 1 },
                                        component: InputReplacement,
                                        props: {
                                            tags: tags,
                                            removeTag: removeTag,
                                            onKeyDown: handleKeyDown,
                                        },
                                    },
                                }}
                            />
                        </FormControl>

                    </ModalBody>
                    <ModalFooter>
                        <ModalButton
                            onClick={handleDisplay}
                        >
                            Done
                    </ModalButton>
                    </ModalFooter>
                </Modal>
                <div
                    className={css({
                        display: 'flex',
                        width: 'auto',
                        flexGrow: '1'
                    })}
                >
                    {tags.map((tag, index) => (
                        <Tag
                            closeable={false}
                            variant={TAG_VARIANT.solid}
                            key={index}
                            overrides={{
                                Root: {
                                    style: ({ $theme }) => {
                                        return {
                                            height: $theme.sizing.scale1200,
                                            width: $theme.sizing.scale2400,
                                            fontWeight: 'bold',
                                            justifyContent: 'center'
                                        }
                                    }
                                }
                            }}
                        >
                            {tag}
                        </Tag>
                    ))}
                </div>

            </SkillsDisplayWrapper>
                            
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

