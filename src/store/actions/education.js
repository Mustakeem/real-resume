import { myFirebase, db } from '../../firebase/fbConfig';

export const POST_EDUCATION = 'POST_EDUCATION';
export const GET_EDUCATION = 'GET_EDUCATION';
export const DELETE_EDUCATION = 'DELETE_EDUCATION';


const postEducation = () => {
    return {
        type: POST_EDUCATION
    };
};

const getEducation = dataItems => {
    return {
        type: GET_EDUCATION,
        dataItems
    };
};

const deleteEducation = () => {
    return {
        type: DELETE_EDUCATION
    };
};

export const createEducation = (
    institute,
    certificateTitle,
    majorCategory,
    GPA,
    link,
    location,
    startDate,
    endDate,
    currentlyPursuing
) => dispatch => {
    myFirebase
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                const isValidDate = (endDate) ? (new Date(endDate)) : 'null';
                db.collection('education').doc(institute).set({
                    institute: institute,
                    certificateTitle: certificateTitle,
                    majorCategory: majorCategory,
                    GPA: GPA,
                    link: link,
                    location: location,
                    startDate: new Date(startDate),
                    endDate: isValidDate,
                    currentlyPursuing: currentlyPursuing,
                    userId: user.uid
                }, { merge: true })
                    .then(() => {
                        dispatch(postEducation())
                    })
                    .catch(error => {
                        console.log(error);
                    });

            }
        })
};

export const showEducation = () => dispatch => {
    myFirebase
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                db.collection('education').where('userId', '==', user.uid).get()
                    .then(querySnapshot => {
                        const data = querySnapshot.docs.map((documentSnapshot) => {
                            return documentSnapshot.data();
                        });
                        const dataItems = data.map((dataItem) => {
                            return dataItem
                        });
                        // console.table(dataItems);
                        return dataItems
                    })
                    .then((dataItems) => {
                        dispatch(getEducation(dataItems));
                    })
                    .catch(error => {
                        console.log(error);
                    });

            }
        })
};

export const removeEducation = () => dispatch => {

};