import { myFirebase, db } from '../../firebase/fbConfig';

export const POST_WORK_EXPERIENCE = 'POST_WORK_EXPERIENCE';
export const GET_WORK_EXPERIENCE = 'GET_WORK_EXPERIENCE';
export const DELETE_WORK_EXPERIENCE = 'DELETE_WORK_EXPERIENCE';


const postWorkExperience = () => {
    return {
        type: POST_WORK_EXPERIENCE
    };
};

const getWorkExperience = dataItems => {
    return {
        type: GET_WORK_EXPERIENCE,
        dataItems
    };
};

const deleteWorkExperience = () => {
    return {
        type: DELETE_WORK_EXPERIENCE
    };
};

export const createWorkExperience = (
    organization,
    jobTitle,
    location,
    startDate,
    endDate,
    isCurrentlyWorking
) => dispatch => {
    myFirebase
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                const isValidDate = (endDate) ? (new Date(endDate)) : 'null';
                db.collection('workExperience').doc(user.uid).set({
                    organization: organization,
                    jobTitle: jobTitle,
                    location: location,
                    startDate: new Date(startDate),
                    endDate:  isValidDate,
                    isCurrentlyWorking: isCurrentlyWorking,
                    userId: user.uid
                }, { merge: true })
                    .then(() => {
                        // console.log(isValidDate);
                        dispatch(postWorkExperience())
                    })
                    .catch(error => {
                        console.log(error);
                    });

            }
        })
};

export const showWorkExperience = () => dispatch => {
    myFirebase
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                db.collection('workExperience').where('userId', '==', user.uid).get()
                    .then(querySnapshot => {
                        const data = querySnapshot.docs.map((documentSnapshot) => {
                            return documentSnapshot.data();
                        });
                        const dataItems = data.map((dataItem) => {
                            return dataItem
                        });
                        return dataItems
                    })
                    .then((dataItems) => {
                        dispatch(getWorkExperience(dataItems));
                    })
                    .catch(error => {
                        console.log(error);
                    });

            }
        })
};

export const removeWorkExperience = () => dispatch => {

};