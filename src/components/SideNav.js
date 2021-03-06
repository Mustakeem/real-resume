import React, { useState } from 'react';

import { PDFDownloadLink } from '@react-pdf/renderer';
import CreateResume from './CreateResume';

import { connect, useDispatch } from 'react-redux';
import {
  showEducation,
  showProject,
  showWorkExperience,
  showBasicInfo,
  showSocialLinks,
  showSkills,
  personalDetails
} from '../store/actions';

import { useStyletron } from 'baseui';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton
} from 'baseui/modal';
import { Button, KIND } from 'baseui/button';
import { Plus, Search } from 'baseui/icon';
import { Navigation } from 'baseui/side-navigation';
import { HeadingLarge } from 'baseui/typography'
import { useHistory, useLocation } from 'react-router-dom';
import Logo from '../assets/Logo';

const SideNav = ({ personalName, basicInfo, socialLinks,skillsDataItems, educationDataItems, workDataItems, projectsItems }) => {

  const [css, theme] = useStyletron();

  //👉 navigation
  const history = useHistory();
  const location = useLocation();
  const [activeItemId, setActiveItemId] = useState('/');

  //👉 modal
  const [isOpen, setOpen] = useState(false);


  const handleDisplay = () => {
    setOpen(false);
  }

  const createResumehandler = () => {
    setOpen(s => !s)

  }

  return (
    <ul
      className={css({
        width: '12vw',
        paddingLeft: 0,
        paddingRight: 0,
      })}
    >
      <div
        className={css({
          marginBottom: '4vh',
          marginLeft: '3.5vw',
        })}
      >
        <Logo height='67' width='74' />
      </div>

      <div
        className={css({
          borderTop: `1px solid ${theme.colors.mono500}`,
          marginTop: '10px',
          marginBottom: '10px',
        })}
      />

      <Navigation
        items={[
          {
            title: 'Overview',
            itemId: '/',
            subNav: [
              { title: 'Basic Info', itemId: '/basicInfo' },
              {
                title: 'Work Experience',
                itemId: '/workExperience',
              },
              {
                title: 'Education',
                itemId: '/education',
              },
              {
                title: 'Projects',
                itemId: '/projects',
              },
            ]
          }
        ]}
        activeItemId={location.pathname}
        onChange={({ event, item }) => {
          // prevent page reload
          event.preventDefault();
          setActiveItemId(item.itemId);
          history.push(item.itemId);
        }}
        overrides={{
          NavItem: {
            style: ({ $theme }) => {
              return {
                fontWeight: 'bold',
                marginTop: '1vh',
                ':hover': {
                  color: $theme.colors.mono800
                }
              };
            }
          }
        }}
      />
      <div
        className={css({
          borderTop: `1px solid ${theme.colors.mono500}`,
          marginTop: '2vh',
          marginBottom: '10px',
        })}
      />
      <Button
        type='submit'
        endEnhancer={() => <Plus size={22} />}
        onClick={createResumehandler}
        overrides={{
          BaseButton: {
            style: {
              width: '100%'
            }
          }
        }}
      >
        Create Resume
      </Button>
      <div
        className={css({
          borderTop: `1px solid ${theme.colors.mono500}`,
          marginTop: '10px',
          marginBottom: '10px',
        })}
      />
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
        </ModalBody>
        <ModalFooter>
          {/* <ModalButton
            onClick={handleDisplay}
            kind={KIND.tertiary}
          >
            Preview
          </ModalButton> */}
          <ModalButton
            onClick={handleDisplay}
          >
            <PDFDownloadLink
              document={
                <CreateResume
                  basicInfo={[basicInfo]}
                  name={[personalName]}
                  skills={skillsDataItems}
                  socialLinks={[socialLinks]}
                  educationData={educationDataItems}
                  projectData={projectsItems}
                  workData={workDataItems}
                />
              }
              fileName='Resume.pdf'
              style={{
                textDecoration: 'none',
                color: '#fff',
                padding: '0',
                backgroundColor: 'grey'
              }}
            >
              {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
            </PDFDownloadLink>
          </ModalButton>

        </ModalFooter>
      </Modal>
    </ul>


  )
}

const mapState = state => ({
  personalName: state.basicInfo.details,
  basicInfo: state.basicInfo.basicInfoItems,
  socialLinks: state.basicInfo.socialLinks,
  skillsDataItems: state.basicInfo.skillsDataItems,
  educationDataItems: state.education.dataItems,
  workDataItems: state.workExperience.dataItems,
  projectsItems: state.projects.dataItems,
})

const mapDispatch = dispatch => {
  dispatch(showBasicInfo())
  dispatch(showSocialLinks())
  dispatch(showSkills())
  dispatch(showWorkExperience())
  dispatch(personalDetails())
  dispatch(showProject())
  dispatch(showEducation())
  return {

  }

}

export default connect(mapState, mapDispatch)(SideNav);