import React, { useState } from 'react';

import { connect, useDispatch } from 'react-redux';

import { useStyletron } from 'baseui';
import { Input, StyledInput } from 'baseui/input';
import { Plus, ArrowRight, Delete } from 'baseui/icon';
import { Button, SIZE } from 'baseui/button';
import { Tag, VARIANT as TAG_VARIANT } from 'baseui/tag';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    FocusOnce,
} from 'baseui/modal';
import { FormControl } from 'baseui/form-control';


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
        // setDisplay(true);
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
        <div>
            <FormWrapper>
                <Button
                    size={SIZE.Large}
                    endEnhancer={() => <Plus />}
                    onClick={() => setOpen(s => !s)}
                >
                    Add Skills
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
                        <FormControl
                            label='Soft Skills'
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

            </FormWrapper>
        </div>
    );
}

export default Overview;