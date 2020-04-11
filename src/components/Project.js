import React, { useState } from 'react';

import { connect, useDispatch } from 'react-redux';
import { createProject, showProject } from '../store/actions';

import { useStyletron } from 'baseui';
import { H1 } from 'baseui/typography';
import { Datepicker, formatDate } from 'baseui/datepicker';
import { Plus, ArrowRight } from 'baseui/icon'
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

    const state = {
        projectTitle: projectTitle,
        bio: bio
    }

    const handleDisplay = () => {
        const { projectTitle, bio } = state;
        dispatch(createProject(projectTitle, bio))
        setOpen(false);
        setDisplay(true);
    }

    return (
        <div>
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
                        <FormWrapper>
                            <H1> {p.projectTitle}</H1>
                            <H1> {p.bio}</H1>
                        </FormWrapper>
                    )
                })
            )}
        </div >
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
