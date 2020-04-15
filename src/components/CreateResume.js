import React, { useState } from 'react';

import { connect, useDispatch } from 'react-redux';
import { showEducation, showProject, showWorkExperience } from '../store/actions';

import {
    Page,
    Text,
    View,
    Document,
    StyleSheet
} from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
    }
});



const CreateResume = (props) => {
    return (
        <Document>
            <Page size='A4' style={styles.page}>
                {props.educationData
                    ? props.educationData.map((a, index) => {
                        return (
                            <View>
                                <View key={a.institute} style={styles.section}>
                                    <Text>{a.institute}</Text>
                                    <Text>{a.currentlyPursuing.toString()}</Text>
                                </View>
                            </View>
                        )
                    }) : ''}
                {props.projectData
                    ? props.projectData.map((a, index) => {
                        return (
                            <View>
                                <View key={a.projectTitle} style={styles.section}>
                                    <Text>{a.projectTitle}</Text>
                                    <Text>{a.bio}</Text>
                                </View>
                            </View>
                        )
                    }) : ''}
            </Page>
        </Document>
    )
}

export default CreateResume;
