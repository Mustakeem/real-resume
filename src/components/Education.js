import React, { useState } from 'react';

import moment from 'moment';

import { connect, useDispatch } from 'react-redux';
import { createEducation, showEducation } from '../store/actions';

import { useStyletron } from 'baseui';
import { HeadingMedium, ParagraphLarge, LabelLarge } from 'baseui/typography';
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

import { Negative } from './NegativeInput';
import BorderBoxWrapper from './BorderBoxWrapper';
import Main from './Main';
import FormWrapper from './FormWrapper';


const Education = ({ shouldDisplay, dataItems }) => {
    const [css, theme] = useStyletron();

    const dispatch = useDispatch();

    const [isValid, setIsValid] = useState(false);
    const [isVisited, setIsVisited] = useState(false);
    const shouldShowError = !isValid && isVisited;

    //👉 modal open and close
    const [isOpen, setOpen] = useState(false);

    //👉 render component
    // const [isDisplay, setDisplay] = useState(false);

    //👉 set inputs
    const [institute, setInstitute] = useState('');
    const [certificateTitle, setCertificateTitle] = useState('');
    const [majorCategory, setMajorCategory] = useState('');
    const [GPA, setGPA] = useState('');
    const [location, setLocation] = useState('');
    const [link, setLink] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentlyPursuing, setCurrentlyPursuing] = useState(false);

    const state = {
        institute: institute,
        certificateTitle: certificateTitle,
        majorCategory: majorCategory,
        GPA: GPA,
        link: link,
        location: location,
        startDate: startDate,
        endDate: endDate,
        currentlyPursuing: currentlyPursuing
    }

    const handleDisplay = () => {
        const {
            institute,
            certificateTitle,
            majorCategory,
            GPA,
            link,
            location,
            startDate,
            endDate,
            currentlyPursuing
        } = state;
        dispatch(createEducation(
            institute,
            certificateTitle,
            majorCategory,
            GPA,
            link,
            location,
            startDate,
            endDate,
            currentlyPursuing
        ));
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
                    Add education
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

                    <ModalHeader>Education</ModalHeader>

                    <ModalBody >
                        <FormControl
                            label='Institute name'
                        >
                            <Input
                                placeholder='Enter institute name'
                                value={institute}
                                onChange={(e) => { setInstitute(e.target.value) }}
                                onBlur={() => setIsVisited(true)}
                                overrides={shouldShowError ? { After: Negative } : {}}
                                type='text'
                                required
                            />
                        </FormControl>
                        <FormControl
                            label='Certificate title'
                        >
                            <Input
                                placeholder='Enter certificate title'
                                value={certificateTitle}
                                onChange={(e) => { setCertificateTitle(e.target.value) }}
                                onBlur={() => setIsVisited(true)}
                                overrides={shouldShowError ? { After: Negative } : {}}
                                type='text'
                                required
                            />
                        </FormControl>
                        <FormControl
                            label='Major category'
                        >
                            <Input
                                placeholder='Enter major category'
                                value={majorCategory}
                                onChange={(e) => { setMajorCategory(e.target.value) }}
                                onBlur={() => setIsVisited(true)}
                                type='text'

                            />
                        </FormControl>
                        <FormControl
                            label='GPA'
                        >
                            <Input
                                placeholder='Enter GPA'
                                value={GPA}
                                onChange={(e) => { setGPA(e.target.value) }}
                                onBlur={() => setIsVisited(true)}
                                type='number'
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
                                type='text'
                            />
                        </FormControl>
                        <FormControl
                            label='Link'
                        >
                            <Input
                                placeholder='Enter related link'
                                value={link}
                                onChange={(e) => { setLink(e.target.value) }}
                                onBlur={() => setIsVisited(true)}
                                type='text'
                            />
                        </FormControl>
                        <FormControl>
                            <Checkbox
                                checked={currentlyPursuing}
                                onChange={e => setCurrentlyPursuing(e.target.checked)}
                                labelPlacement={LABEL_PLACEMENT.right}
                            >
                                Currently pursuing
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

                            {!currentlyPursuing ? (
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
                            ) : 'Currently pursuing'}

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

            {shouldDisplay && (
                //👉TODO: Want to hold this component through redux 
                dataItems.map((p, index) => {
                    return (
                        <BorderBoxWrapper>
                            <HeadingMedium className={css({
                                textTransform: 'capitalize'
                            })}>
                                {p.majorCategory}
                            </HeadingMedium>
                            <LabelLarge>
                                Institute:
                            </LabelLarge>
                            <ParagraphLarge>
                                {p.institute}
                            </ParagraphLarge>
                            <LabelLarge>
                                Location:
                            </LabelLarge>
                            <ParagraphLarge>
                                {p.location}
                            </ParagraphLarge>
                            <LabelLarge>
                                GPA:
                            </LabelLarge>
                            <ParagraphLarge>
                                {p.GPA}
                            </ParagraphLarge>
                            <LabelLarge>
                                Date:
                            </LabelLarge>
                            <ParagraphLarge>
                                {moment(p.startDate.seconds * 1000).format('l')}
                                {(p.endDate !== 'null') ? ' - ' + moment(p.endDate.seconds * 1000).format('l') : ''}
                            </ParagraphLarge>
                        </BorderBoxWrapper>
                    )
                })
            )}
        </Main >
    )
}

const mapState = state => ({
    dataItems: state.education.dataItems,
    shouldDisplay: state.education.shouldDisplay
})

const mapDispatch = dispatch => {
    dispatch(showEducation())
    return {

    }
}
export default connect(mapState, mapDispatch)(Education);
