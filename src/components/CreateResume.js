import React, { useState } from 'react';

import { connect, useDispatch } from 'react-redux';
import { showEducation, showProject, showWorkExperience } from '../store/actions';

import {
    Font,
    Page,
    Text,
    View,
    Document,
    StyleSheet
} from '@react-pdf/renderer';
import { StyledEndEnhancer } from 'baseui/button';


// const srcf = 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCRc4EsA.woff2';


// Font.register({ family: 'RobotoBold', src: `https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCRc4EsA.woff2` } );

const styles = StyleSheet.create({
    page: {
        fontSize: '11pt',
        flexDirection: 'column',
    },
    heading1: {
        fontSize: '25pt',
        fontWeight: 'bold',
      	marginTop: '11pt',
        textTransform: 'capitalize'
    },
    heading2: {
        fontSize: '17pt',
        fontWeight: 'bold',
      	marginTop: '11pt',
        textTransform: 'capitalize'
    },
    subHeading: {
        fontSize: '17pt',
        fontWeight: 'bold',
      	marginTop: '7pt',
        textTransform: 'capitalize',
        color: '#4d4d4d'
    },
  	description:{
        fontWeight: 'bold',
      	marginTop: '11pt',
    },
  	socialBlock:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      height:'5vh',
      width: '100vw',
      backgroundColor: 'black'
    },
    socialBlockItems:{
        margin: '12vw'
    },
    formatSection: {
        margin: '12pt 21pt'
    },
  	skillsSection:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    skillsSectionItems:{
      margin: '2vw 4vw 0',
      fontWeight: 'bold',
  	  border: '1pt',
      borderStyle: 'ridge',
      padding: '7pt',
      borderRadius: '2pt'
    },
  	line:{
    }
  	
});



const basicData = [
    {
        firstName: 'Mustakeem',
        lastName: 'momin',
        description: 'Content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using content here, making it look like readable English.',
        Role: 'Front-end developer'
    }
];

const skillsData = [
  'ReactJs', 'NodeJs', 'ES6 Javascript', 'HTML', 'CSS'
];



const workExperience = [
  {
    organization: 'Infosys',
    jobTitle: 'Front-end Developer',
    location: 'Mumbai',
    currentlyWorking: true,
    startDate: '17-08-19',
    endDate: '',
  }
];



const CreateResume = (props) => {
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                {basicData
                    ? basicData.map((a, index) => {
                        return (
                            <View style={styles.formatSection}>
                                <View key={index}>
                                    <Text
                                        style={styles.heading1}
                                    >
                                        {a.firstName} {a.lastName}
                                    </Text>
                                    <Text
                                        style={styles.subHeading}
                                    >
                                        {a.Role}
                                    </Text>
                                    <Text
                                        style={styles.description}
                                    >
                                        {a.description}
                                    </Text>
                                </View>
                            </View>
                        )
                    }) : ''}
              <View
                  style={styles.socialBlock}
              >
                  <Text style={styles.socialBlockItems}>some</Text>
                  <Text style={styles.socialBlockItems}>some</Text>
                  <Text style={styles.socialBlockItems}>some</Text>
                  <Text style={styles.socialBlockItems}>some</Text>
              </View>
              
              <View style={styles.formatSection}>
              	<Text style={styles.subHeading}>Skills</Text>
              
                <View style={styles.skillsSection}>
                  {skillsData
                  ? skillsData.map((a,index)=>{
                      return (
                          <Text key={index} style={styles.skillsSectionItems}>{a}</Text>
                      )
                  }): ''}
                </View>
              </View>
              
              
              <View style={styles.formatSection}>
              	<Text style={styles.subHeading}>Work Experience</Text>
              
                <View style={styles.skillsSection}>
                  {props.workData
                  ? props.workData.map((a,index)=>{
                      return (
                          <Text key={index} style={styles.skillsSectionItems}>{a.organization}</Text>
                      )
                  }): ''}
                </View>
              </View>

            </Page>
        </Document>
    )
}

export default CreateResume;