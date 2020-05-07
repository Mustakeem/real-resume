import { myFirebase, db } from '../../firebase/fbConfig';

export const POST_PROJECT = 'POST_PROJECT';
export const GET_PROJECT = 'GET_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';


const postProject = () => {
    return {
        type: POST_PROJECT
    };
};

const getProject = dataItems => {
    return {
        type: GET_PROJECT,
        dataItems
    };
};

const deleteProject = () => {
    return {
        type: DELETE_PROJECT
    };
};

export const createProject = (
    projectTitle,
    link,
    bio
) => dispatch => {
    myFirebase
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                db.collection('projects').doc(user.uid).set({
                    projectTitle,
                    link,
                    bio,
                    userId: user.uid
                }, { merge: true })
                    .then(() => {
                        dispatch(postProject())
                    })
                    .catch(error => {
                        console.log(error);
                    });

            }
        })
};

export const showProject = () => dispatch => {
    myFirebase
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                db.collection('projects').where('userId', '==', user.uid).get()
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
                        dispatch(getProject(dataItems));
                    })
                    .catch(error => {
                        console.log(error);
                    });

            }
        })
};

export const removeProject = () => dispatch => {

};