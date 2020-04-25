import React, { useState } from 'react';

import moment from 'moment';

import {
  Font,
  Page,
  Text,
  View,
  Document,
  StyleSheet
} from '@react-pdf/renderer';


// const srcf = 'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCRc4EsA.woff2';


// Font.register({ family: 'RobotoBold', src: `https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfCRc4EsA.woff2` } );

const styles = StyleSheet.create({
  page: {
    fontSize: '11pt',
    flexDirection: 'column',
  },
  heading1: {
    fontSize: '25pt',
    fontWeight: '900',
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
  },
  description: {
    fontWeight: 'bold',
    marginTop: '11pt',
  },
  socialBlock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    height: '5vh',
    width: '100vw',
    backgroundColor: 'black'
  },
  socialBlockItems: {
    // margin: '12vw 5vw'
  },
  formatSection: {
    margin: '12pt 21pt'
  },
  skillsSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  skillsSectionItems: {
    margin: '2vw 4vw 0',
    fontWeight: 'bold',
    border: '1pt',
    borderStyle: 'ridge',
    padding: '7pt',
    borderRadius: '2pt'
  },
  line: {
  },
  displaySection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  sectionWithDate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  withDate: {
    fontSize: '15pt',
    fontWeight: 'bold',
    width:'25vw',
    marginTop: '15pt',
    textTransform: 'capitalize',
    color: '#4d4d4d'
  },
  date: {
    fontSize: '11pt',
    fontWeight: 'bold',
    width: '20vw',
    fontStyle: 'oblique',
    marginTop: '15pt',
    marginLeft: '280pt',
    textTransform: 'capitalize',
    color: '#4d4d4d'
  },
  subHeading2: {
    fontSize: '15pt',
    fontWeight: 'bold',
    marginTop: '15pt',
    textTransform: 'capitalize',
  },
  subHeadingOblique: {
    fontSize: '12pt',
    fontWeight: 'bold',
    fontStyle: 'oblique',
    marginTop: '11pt',
    textTransform: 'capitalize',
    color: '#4d4d4d'
  },
  link: {
    margin: '11pt 0pt',
  }

});

// const basicData = [
//   {
//     firstName: 'Mustakeem',
//     lastName: 'momin',
//     description: 'Content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using content here, making it look like readable English.',
//     Role: 'Front-end developer'
//   }
// ];

const skillsData = [
  'ReactJs', 'NodeJs', 'ES6 Javascript', 'HTML', 'CSS'
];



// const workData = [
//   {
//     organization: 'Infosys',
//     jobTitle: 'Front-end Developer',
//     location: 'Mumbai',
//     currentlyWorking: true,
//     startDate: '17-08-19',
//     endDate: '',
//   }
// ];




const CreateResume = (props) => {

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {props.name
          ? props.name.map((a, index) => {
            return (
              <View style={styles.formatSection}>
                <View key={index}>
                  <Text
                    style={styles.heading1}
                  >
                    {a.firstName} {a.lastName}
                  </Text>
                </View>
              </View>
            )
          }) : ''}

        {props.basicInfo
          ? props.basicInfo.map((b, index) => {
            return (
              <View style={styles.formatSection}>
                <View key={index}>
                  <Text
                    style={styles.subHeading}
                  >
                    {b.majorCategory}
                  </Text>
                  <Text
                    style={styles.description}
                  >
                    {b.description}
                  </Text>
                </View>
              </View>

            )
          }) : ''}

        {props.socialLinks
          ? props.socialLinks.map((b, index) => {
            return (
              <View
                style={styles.socialBlock}
              >
                <Text key={index} style={styles.socialBlockItems}></Text>
                {props.name
                  ? props.name.map((b, index) => {
                    return (
                      <View
                        style={styles.socialBlock}
                      >
                        <Text key={index} style={styles.socialBlockItems}></Text>
                        <Text key={index} style={styles.socialBlockItems}></Text>
                      </View>
                    )
                  }) : ''}
              </View>
            )
          }) : ''}


        <View style={styles.formatSection}>
          <Text style={styles.subHeading}>Skills</Text>

          <View style={styles.skillsSection}>
            {props.skills.skillsTags
              ? props.skills.skillsTags.map((a, index) => {
                return (
                  <Text key={index} style={styles.skillsSectionItems}>{a}</Text>
                )
              }) : ''}
          </View>
        </View>


        <View style={styles.formatSection}>
          <Text style={styles.subHeading}>Work Experience</Text>

          <View style={styles.displaySection}>
            {props.workData
              ? props.workData.map((a, index) => {
                return (
                  <View>
                    <View key={index} style={styles.sectionWithDate}>
                      <Text style={styles.withDate}>{a.jobTitle}</Text>
                      <Text style={styles.date}>
                        {moment(a.startDate.seconds * 1000).format('l')}
                        {(a.endDate !== 'null') ? ' - ' + moment(a.endDate.seconds * 1000).format('l') : ' - Currently working'}
                      </Text>
                    </View>
                    <Text style={styles.subHeadingOblique}>{a.organization}</Text>
                    <Text style={styles.subHeadingOblique}>{a.location}</Text>
                  </View>
                )
              }) : ''}
          </View>
        </View>

        <View style={styles.formatSection}>
          <Text style={styles.subHeading}>Education</Text>

          <View style={styles.displaySection}>
            {props.educationData
              ? props.educationData.map((a, index) => {
                return (
                  <View>
                    <View key={index} style={styles.sectionWithDate}>
                      <Text style={styles.withDate}>{a.certificateTitle}</Text>
                      <Text style={styles.date}>
                        {moment(a.startDate.seconds * 1000).format('l')}
                        {(a.endDate !== 'null') ? ' - ' + moment(a.endDate.seconds * 1000).format('l') : ' - Currently pursuing'}
                      </Text>
                    </View>
                    <Text style={styles.subHeadingOblique}>{a.institute}</Text>
                    <Text style={styles.subHeadingOblique}>{a.location}</Text>
                  </View>
                )
              }) : ''}
          </View>

        </View>

        <View style={styles.formatSection}>
          <Text style={styles.subHeading}>Projects</Text>

          <View style={styles.displaySection}>
            {props.projectData
              ? props.projectData.map((a, index) => {
                return (
                  <View>
                    <View key={index} style={styles.sectionWithDate}>
                      <Text style={styles.subHeading2}>{a.projectTitle}</Text>
                    </View>
                    <Text style={styles.link}>{a.link}</Text>
                    <Text>{a.bio}</Text>
                  </View>
                )
              }) : ''}
          </View>

        </View>

      </Page>
    </Document>
  )
}

export default CreateResume;