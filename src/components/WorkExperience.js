import React, { useState } from 'react';

import moment from 'moment';


import { connect, useDispatch } from 'react-redux';
import { createWorkExperience, showWorkExperience } from '../store/actions';

import { useStyletron } from 'baseui';
import { Datepicker, formatDate } from 'baseui/datepicker';
import { HeadingMedium, LabelLarge, ParagraphLarge } from 'baseui/typography';
import { Plus, ArrowRight, Delete } from 'baseui/icon'
import { Button, SIZE } from 'baseui/button';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    FocusOnce,
} from 'baseui/modal';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox";

import { Negative } from './NegativeInput';
import BorderBoxWrapper from './BorderBoxWrapper'
import Main from './Main'


const FormWrapper = ({ children }) => {
    const [css, theme] = useStyletron();

    return (
        <div
            className={css({
                display: 'flex',
                flexDirection: 'column',
                width: '50vw',
                height: 'auto',
                // backgroundColor: theme.colors.mono200
            })}
        >
            {children}
        </div>
    );

};


const WorkExperience = ({ shouldDisplay, dataItems }) => {
    const dispatch = useDispatch()
    const [css, theme] = useStyletron();
    const [isValid, setIsValid] = useState(false);
    const [isVisited, setIsVisited] = useState(false);
    const shouldShowError = !isValid && isVisited;


    //👉 modal open and close
    const [isOpen, setOpen] = useState(false);

    //👉 render component
    // const [isDisplay, setDisplay] = useState(false);

    //👉 set inputs
    const [organization, setOrganization] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isCurrentlyWorking, setCurrentlyWorking] = useState(false);
    // const [workExperienceId, setWorkExperienceId] = useState(false);
    
    const state = {
        organization: organization,
        jobTitle: jobTitle,
        location: location,
        startDate: startDate,
        endDate: endDate,
        isCurrentlyWorking: isCurrentlyWorking,
    }
    
    
    const handleDisplay = () => {
        const { organization, jobTitle, location, startDate, endDate, isCurrentlyWorking } = state;
        dispatch(createWorkExperience(organization, jobTitle, location, startDate, endDate, isCurrentlyWorking));
        setOpen(false);
        // setDisplay(true);
    }
    
    return (
        <Main>
            <FormWrapper>
                <Button
                    size={SIZE.Large}
                    endEnhancer={() => <Plus />}
                    onClick={() => setOpen(s => !s)}
                >
                    Add Work experience
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

                    <ModalHeader>Work experience</ModalHeader>

                    <ModalBody >
                        <FormControl
                            label='Organization name'
                        >
                            <Input
                                placeholder='Enter Organization name'
                                value={organization}
                                onChange={(e) => { setOrganization(e.target.value) }}
                                onBlur={() => setIsVisited(true)}
                                overrides={shouldShowError ? { After: Negative } : {}}
                                type='text'
                                required
                            />
                        </FormControl>
                        <FormControl
                            label='Job title'
                        >
                            <Input
                                placeholder='Enter job title'
                                value={jobTitle}
                                onChange={(e) => { setJobTitle(e.target.value) }}
                                onBlur={() => setIsVisited(true)}
                                overrides={shouldShowError ? { After: Negative } : {}}
                                type='text'
                                required
                            />
                        </FormControl>
                        <FormControl
                            label='Location'
                        >
                            <Input
                                placeholder='Enter location'
                                value={location}
                                onChange={(e) => { setLocation(e.target.value) }}
                                onBlur={() => setIsVisited(true)}
                                overrides={shouldShowError ? { After: Negative } : {}}
                                type='text'
                                required
                            />
                        </FormControl>
                        <FormControl>
                            <Checkbox
                                checked={isCurrentlyWorking}
                                onChange={e => setCurrentlyWorking(e.target.checked)}
                                labelPlacement={LABEL_PLACEMENT.right}
                            >
                                Currently working
                            </Checkbox>
                        </FormControl>
                        <div className={css({ display: 'flex', alignItems: 'center' })}>
                            <div
                                className={css({
                                    width: '120px',
                                    marginRight: theme.sizing.scale300,
                                })}
                            >
                                <FormControl
                                    label='Start date'
                                    caption='YYYY/MM/DD'
                                >
                                    <Datepicker
                                        value={startDate}
                                        onChange={({ date }) =>
                                            setStartDate(Array.isArray(date) ? date : [date])
                                        }
                                    />
                                </FormControl>
                            </div>
                            <div
                                className={css({
                                    marginRight: theme.sizing.scale300,
                                })}
                            >
                                <ArrowRight size={24} />
                            </div>

                            {!isCurrentlyWorking ? (
                                <div
                                    className={css({
                                        width: '120px',
                                        marginRight: theme.sizing.scale300,
                                    })}
                                >
                                    <FormControl
                                        label='End date'
                                        caption='YYYY/MM/DD'
                                    >
                                        <Datepicker
                                            value={endDate}
                                            onChange={({ date }) =>
                                                setEndDate(Array.isArray(date) ? date : [date])
                                            }
                                        />
                                    </FormControl>
                                </div>
                            ):'Currently working'}

                        </div>
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

            {shouldDisplay &&
                //👉TODO: Want to hold this component through redux 
                (
                    dataItems.map(p => {
                        return (
                            <BorderBoxWrapper>
                                <HeadingMedium className={css({
                                    textTransform: 'capitalize'
                                })}>
                                    {p.jobTitle}
                                </HeadingMedium>
                                <LabelLarge>
                                    Organization:
                                </LabelLarge>
                                <ParagraphLarge>
                                    {p.organization}
                                </ParagraphLarge>
                                <LabelLarge>
                                    Location:
                                </LabelLarge>
                                <ParagraphLarge>
                                    {p.location}
                                </ParagraphLarge>
                                <LabelLarge>
                                    Date:
                                </LabelLarge>
                                <ParagraphLarge>
                                    {moment(p.startDate.seconds * 1000).format('l')}
                                    {p.endDate ? ' - '+moment(p.endDate.seconds *1000).format('l'):''}
                                </ParagraphLarge>
                            </BorderBoxWrapper>
                        )
                    })
                )
            }
        </Main >
    )
}

const mapState = state => ({
    dataItems: state.workExperience.dataItems,
    shouldDisplay: state.workExperience.shouldDisplay
})

const mapDispatch = dispatch => {
    dispatch(showWorkExperience())
    return {

    }
}
export default connect(mapState, mapDispatch)(WorkExperience);

