import React, { useState } from 'react';

import { connect, useDispatch } from 'react-redux';

import { useStyletron } from 'baseui';
import { FormControl } from 'baseui/form-control';
import { H4, LabelSmall, Label1, Label4, Paragraph1, Label2 } from 'baseui/typography';
import { Input } from 'baseui/input';
import { PhoneInput, COUNTRIES } from 'baseui/phone-input';
import { Button, SIZE } from 'baseui/button';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    FocusOnce,
} from 'baseui/modal';
import { StyledLink } from 'baseui/link';
import { Textarea } from 'baseui/textarea';


import { Negative } from './NegativeInput';
import {
    showBasicInfo,
    createBasicInfo,
    socialLinkUpdate,
    showSocialLinks
} from '../store/actions';
import LinkWrapper from './LinkWrapper';
import DisplayWrapper from './DisplayWrapper';
import Main from './Main';
import BorderBoxWrapper from './BorderBoxWrapper';


const BasicInfo = ({ socialLinks, basicInfoItems }) => {
    const dispatch = useDispatch();
    const [css, theme] = useStyletron();

    //👉 modal open and close
    const [isOpenLinks, setOpenLinks] = useState(false);
    const [isOpenBasic, setOpenBasic] = useState(false);

    //👉 set inputs
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [otherUrl, setOtherUrl] = useState('');
    const [majorCategory, setMajorCategory] = useState('');
    const [description, setDescription] = useState('');


    const state = {
        linkedinUrl: linkedinUrl,
        githubUrl: githubUrl,
        otherUrl: otherUrl,
        majorCategory: majorCategory,
        description: description
    }

    const handleSubmitLinks = () => {
        const { linkedinUrl, githubUrl, otherUrl } = state;
        dispatch(socialLinkUpdate(linkedinUrl, githubUrl, otherUrl));
        setOpenLinks(false);
    }

    const handleSubmitBasic = () => {
        const { majorCategory, description } = state;
        dispatch(createBasicInfo(majorCategory, description));
        setOpenBasic(false);
    }
    return (
        <Main>
            <BorderBoxWrapper>
                <H4>Basic Info</H4>

                <Label1>Major Category</Label1>
                <Paragraph1>{basicInfoItems.majorCategory}</Paragraph1>

                <Label1>Description</Label1>
                <Paragraph1>{basicInfoItems.description}</Paragraph1>

                <div
                    className={css({
                        marginBottom: '5vh',
                    })}
                >
                    <Button
                        onClick={() => setOpenBasic(s => !s)}
                        size={SIZE.small}
                    >
                        Edit
                    </Button>
                </div>

                <Modal
                    onClose={() => setOpenBasic(false)}
                    isOpen={isOpenBasic}
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

                    <ModalHeader>Edit basic info</ModalHeader>

                    <ModalBody>
                        <FormControl
                            label='Major Category'
                        >
                            <Input
                                placeholder='Enter your major professional field'
                                value={majorCategory}
                                onChange={(e) => { setMajorCategory(e.target.value) }}
                                // onBlur={() => setIsVisited(true)}
                                // overrides={shouldShowError ? { After: Negative } : {}}
                                type='url'
                            />
                        </FormControl>
                        <FormControl
                            label='Description'
                        >
                            <Textarea
                                placeholder='Enter your github url'
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                                // onBlur={() => setIsVisited(true)}
                                // overrides={shouldShowError ? { After: Negative } : {}}
                                type='url'
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <ModalButton
                            onClick={handleSubmitBasic}
                        >
                            Done
                        </ModalButton>
                    </ModalFooter>
                </Modal>
            </BorderBoxWrapper>

            <BorderBoxWrapper>
                <H4>Social Links</H4>
                <DisplayWrapper>
                    <LinkWrapper>
                        <Label1>Github</Label1>
                        <StyledLink href={socialLinks.githubUrl}>{socialLinks.githubUrl}</StyledLink>
                    </LinkWrapper>
                    <LinkWrapper>
                        <Label1>Linkedin</Label1>
                        <StyledLink href={socialLinks.linkedinUrl}>{socialLinks.linkedinUrl}</StyledLink>
                    </LinkWrapper>
                    <LinkWrapper>
                        <Label1>Other</Label1>
                        <StyledLink href={socialLinks.otherUrl}>{socialLinks.otherUrl}</StyledLink>
                    </LinkWrapper>
                </DisplayWrapper>
                <div
                    className={css({
                        marginBottom: '5vh',
                    })}
                >
                    <Button
                        onClick={() => setOpenLinks(s => !s)}
                        size={SIZE.small}
                    >
                        Edit
                    </Button>
                </div>

                <Modal
                    onClose={() => setOpenLinks(false)}
                    isOpen={isOpenLinks}
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

                    <ModalHeader>Edit social links</ModalHeader>

                    <ModalBody>
                        <FormControl
                            label='Linkedin url'
                        >
                            <Input
                                placeholder='Enter your linkedin url'
                                value={linkedinUrl}
                                onChange={(e) => { setLinkedinUrl(e.target.value) }}
                                // onBlur={() => setIsVisited(true)}
                                // overrides={shouldShowError ? { After: Negative } : {}}
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
                                // onBlur={() => setIsVisited(true)}
                                // overrides={shouldShowError ? { After: Negative } : {}}
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
                                // onBlur={() => setIsVisited(true)}
                                // overrides={shouldShowError ? { After: Negative } : {}}
                                type='url'
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <ModalButton
                            onClick={handleSubmitLinks}
                        >
                            Done
                        </ModalButton>
                    </ModalFooter>
                </Modal>
            </BorderBoxWrapper>

        </Main>
    )
}
const mapState = state => ({
    socialLinks: state.basicInfo.socialLinks,
    basicInfoItems: state.basicInfo.basicInfoItems
})
const mapDispatch = dispatch => {
    dispatch(showSocialLinks())
    dispatch(showBasicInfo())
    return {

    }
}
export default connect(mapState, mapDispatch)(BasicInfo);