import React, { useState } from 'react';

import { useStyletron } from 'baseui';
import { Datepicker, formatDate } from 'baseui/datepicker';
import { Plus, ArrowRight } from 'baseui/icon'
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


const Education = () => {
    const [css, theme] = useStyletron();

    const [isValid, setIsValid] = useState(false);
    const [isVisited, setIsVisited] = useState(false);
    const shouldShowError = !isValid && isVisited;

    //👉 modal open and close
    const [isOpen, setOpen] = useState(false);

    //👉 render component
    const [isDisplay, setDisplay] = useState(false);

    //👉 set inputs
    const [institute, setInstitute] = useState('Something');
    const [certificateTitle, setCertificateTitle] = useState('something');
    const [majorCategory, setMajorCategory] = useState('something');
    const [GPA, setGPA] = useState('');
    const [location, setLocation] = useState('');
    const [link, setLink] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [checked, setChecked] = useState(false);

    const handleDisplay = () => {
        setOpen(false);
        setDisplay(true);
    }

    const state = {
        institute: institute,
        certificateTitle: certificateTitle,
        majorCategory: majorCategory,
        GPA: GPA,
        link: link,
        location: location,
        startDate: startDate,
        endDate: endDate
    }

    return (
        <div>
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
                                    zIndex: '200'
                                };
                            }
                        }
                    }}
                    isOpen={isOpen}
                    unstable_ModalBackdropScroll

                >

                    <ModalHeader>Work experience</ModalHeader>

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
                                checked={checked}
                                onChange={e => setChecked(e.target.checked)}
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

                            {!checked && (
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
                            )}

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

            {isDisplay && (
                //👉TODO: Want to hold this component through redux 
                <FormWrapper>
                    {state.institute}
                </FormWrapper>
            )}
        </div >
    )
}

export default Education;