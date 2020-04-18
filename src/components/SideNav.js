import React, { useState } from 'react';

import { PDFDownloadLink } from '@react-pdf/renderer';
import CreateResume from './CreateResume';

import { connect, useDispatch } from 'react-redux';
import { showEducation, showProject, showWorkExperience } from '../store/actions';

import { useStyletron } from 'baseui';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton
} from 'baseui/modal';
import { Button, StyledLoadingSpinnerContainer, KIND } from 'baseui/button';
import { Plus, Search } from 'baseui/icon';
import { Navigation } from 'baseui/side-navigation';
import { ListItem, ListItemLabel } from 'baseui/list';
import { useHistory, useLocation } from 'react-router-dom';

const SideNav = ({ educationDataItems, workDataItems, projectsItems }) => {

  const [css, theme] = useStyletron();

  const history = useHistory();
  const location = useLocation();

  //👉 modal
  const [isOpen, setOpen] = useState(false);

  // const [activeItemId, setActiveItemId] = useState('/overview');

  const data = [];
  const handleDisplay = () => {
    setOpen(false);
  }

  const createResumehandler = () => {
    setOpen(s => !s)
    
  }

  return (
    <ul
      className={css({
        width: '14vw',
        marginTop: '11vh',
        paddingLeft: 0,
        paddingRight: 0,
      })}
    >
      <Navigation
        items={[
          {
            title: 'JobSearch',
            itemId: '/jobSearch',
          }
        ]}
        activeItemId={location.pathname}
        onChange={({ event, item }) => {
          // prevent page reload
          event.preventDefault();
          history.push(item.itemId);
        }}

        overrides={{
          NavItem: {
            style: ({ $theme }) => {
              return {
                fontWeight: 'bold',
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
          marginTop: '10px',
          marginBottom: '10px',
        })}
      />
      <Navigation
        items={[
          {
            title: 'Overview',
            itemId: '/overview',
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
          history.push(item.itemId);
        }}
        overrides={{
          NavItem: {
            style: ({ $theme }) => {
              return {
                fontWeight: 'bold',
                marginTop: '6px',
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
          marginTop: '10px',
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
          <ModalButton
            onClick={handleDisplay}
            kind={KIND.tertiary}
          >
            Preview
          </ModalButton>
          <ModalButton
            onClick={handleDisplay}
          >
            <PDFDownloadLink
              document={
                <CreateResume
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
  educationDataItems: state.education.dataItems,
  workDataItems: state.workExperience.dataItems,
  projectsItems: state.projects.dataItems
})

const mapDispatch = dispatch => {

  dispatch(showProject())
  dispatch(showEducation())
  dispatch(showWorkExperience())
  return {

  }

}

export default connect(mapState, mapDispatch)(SideNav);