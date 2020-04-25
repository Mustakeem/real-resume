import React, { useState } from 'react';

import { connect, useDispatch } from 'react-redux';

import { useStyletron } from 'baseui';
import { FormControl } from 'baseui/form-control';
import { Input, StyledInput } from 'baseui/input';
import { Plus, ArrowRight, Delete } from 'baseui/icon';
import { H4, LabelSmall, Label1, Label4, Paragraph1, Label2 } from 'baseui/typography';
import { Tag, VARIANT as TAG_VARIANT } from 'baseui/tag';
import { Button, SIZE, SHAPE } from 'baseui/button';
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

import {
    createSkills,
    showBasicInfo,
    createBasicInfo,
    socialLinkUpdate,
    showSocialLinks,
} from '../store/actions';
import DisplaySkills from './DisplaySkills';
import LinkWrapper from './LinkWrapper';
import DisplayWrapper from './DisplayWrapper';
import Main from './Main';
import BorderBoxWrapper from './BorderBoxWrapper';
import { wait } from '@testing-library/react';


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


const BasicInfo = ({ socialLinks, basicInfoItems }) => {
    // const dataItem  = {...dataItems[0]}

    // const skillsTags = dataItem.skillsTags;

    const dispatch = useDispatch();
    const [css, theme] = useStyletron();

    //👉 input tags
    const [value, setValue] = React.useState('');
    const [tags, setTags] = React.useState([]);

    //👉 modal open and close
    const [isOpenLinks, setOpenLinks] = useState(false);
    const [isOpenBasic, setOpenBasic] = useState(false);
    const [isOpenSkills, setOpenSkills] = useState(false);


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
        description: description,
        tags: tags
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
    };

    const addTag = (tag) => {
        setTags([...tags, tag]);
    };

    const removeTag = (tag) => {
        setTags(tags.filter(t => t !== tag));
    };

    const handleSubmitSkills = () => {
        const { tags } = state;
        dispatch(createSkills(tags));
        setOpenSkills(false);
        // console.log(skillsItems);
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
            <BorderBoxWrapper>
                <H4>Add skills</H4>
                <Button
                    shape={SHAPE.round}
                    onClick={() => setOpenSkills(s => !s)}
                >
                    <Plus />
                </Button>

                <Modal
                    onClose={() => setOpenSkills(false)}
                    isOpen={isOpenSkills}
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
                            onClick={handleSubmitSkills}
                        >
                            Done
                    </ModalButton>
                    </ModalFooter>
                </Modal>
                <DisplaySkills />
            </BorderBoxWrapper>

            <BorderBoxWrapper>
                <H4>Basic Info</H4>

                <Label1>Major Category</Label1>
                <Paragraph1>{basicInfoItems.majorCategory}</Paragraph1>

                <Label1>Description</Label1>
                <Paragraph1>{basicInfoItems.description}</Paragraph1>


                <Button
                    onClick={() => setOpenBasic(s => !s)}
                    size={SIZE.small}
                >
                    Edit
                    </Button>

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

                <Button
                    onClick={() => setOpenLinks(s => !s)}
                    size={SIZE.small}
                >
                    Edit
                    </Button>


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
    basicInfoItems: state.basicInfo.basicInfoItems,
})
const mapDispatch = dispatch => {
    dispatch(showSocialLinks())
    dispatch(showBasicInfo())
    return {

    }
}
export default connect(mapState, mapDispatch)(BasicInfo);