import React, { useState } from 'react';

import Microlink from '@microlink/react';

import { connect, useDispatch } from 'react-redux';
import { createProject, showProject } from '../store/actions';

import { useStyletron } from 'baseui';
import { HeadingMedium, ParagraphLarge, LabelLarge } from 'baseui/typography';
import { Plus } from 'baseui/icon'
import { Button, SIZE } from 'baseui/button';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton
} from 'baseui/modal';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";
import { Textarea } from "baseui/textarea";

import { Negative } from './NegativeInput';
import LinkWrapper from './LinkWrapper';
import FormWrapper from './FormWrapper';
import DisplayWrapper from './DisplayWrapper';
import Main from './Main';
import BorderBoxWrapper from './BorderBoxWrapper';


const Project = ({ shouldDisplay, dataItems }) => {
    const [css, theme] = useStyletron();

    const dispatch = useDispatch();

    const [isValid, setIsValid] = useState(false);
    const [isVisited, setIsVisited] = useState(false);
    const shouldShowError = !isValid && isVisited;

    //👉 modal open and close
    const [isOpen, setOpen] = useState(false);

    //👉 render component
    const [isDisplay, setDisplay] = useState(false);

    //👉 set inputs
    const [projectTitle, setProjectTitle] = useState('');
    const [bio, setBio] = useState('');
    const [link, setLink] = useState('');

    const state = {
        projectTitle: projectTitle,
        link: link,
        bio: bio
    }

    const handleDisplay = () => {
        const { projectTitle, link, bio } = state;
        dispatch(createProject(projectTitle, link, bio))
        setOpen(false);
        setDisplay(true);
    }

    return (
        <Main>
            <FormWrapper>
                <Button
                    size={SIZE.Large}
                    endEnhancer={() => <Plus />}
                    onClick={() => setOpen(s => !s)}
                >
                    Add Project
                </Button>
                <Modal
                    onClose={() => setOpen(false)}
                    overrides={{
                        Root: {
                            style: ({ $theme }) => {
                                return {

                                };
                            }
                        }
                    }}
                    isOpen={isOpen}
                    unstable_ModalBackdropScroll

                >

                    <ModalHeader>Project</ModalHeader>

                    <ModalBody >
                        <FormControl
                            label='Project title'
                        >
                            <Input
                                placeholder='Enter project title'
                                value={projectTitle}
                                onChange={(e) => { setProjectTitle(e.target.value) }}
                                onBlur={() => setIsVisited(true)}
                                overrides={shouldShowError ? { After: Negative } : {}}
                                type='text'
                                required
                            />
                        </FormControl>
                        <FormControl
                            label='Link'
                        >
                            <Input
                                placeholder='Enter link of your project'
                                value={link}
                                onChange={(e) => { setLink(e.target.value) }}
                                onBlur={() => setIsVisited(true)}
                                overrides={shouldShowError ? { After: Negative } : {}}
                                type='url'
                                required
                            />
                        </FormControl>
                        <FormControl
                            label='Project bio'
                        >
                            <Textarea
                                placeholder='Enter project bio'
                                value={bio}
                                onChange={(e) => { setBio(e.target.value) }}
                                onBlur={() => setIsVisited(true)}
                                overrides={shouldShowError ? { After: Negative } : {}}
                                required
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
            {shouldDisplay && (
                //👉TODO: Want to hold this component through redux 

                dataItems.map(p => {
                    return (
                        <BorderBoxWrapper>
                            <HeadingMedium className={css({
                                textTransform: 'capitalize'
                            })}>
                                {p.projectTitle}
                            </HeadingMedium>
                            <DisplayWrapper>
                                <LinkWrapper>
                                    <Microlink url={p.link} size='normal' />
                                </LinkWrapper>
                            </DisplayWrapper>
                            <LabelLarge>
                                Bio:
                             </LabelLarge>
                            <ParagraphLarge>
                                {p.bio}
                            </ParagraphLarge>

                        </BorderBoxWrapper>

                    )
                })
            )}
        </Main >
    )
}

const mapState = state => ({
    dataItems: state.projects.dataItems,
    shouldDisplay: state.projects.shouldDisplay
})

const mapDispatch = dispatch => {
    dispatch(showProject())
    return {

    }
}

export default connect(mapState, mapDispatch)(Project);
