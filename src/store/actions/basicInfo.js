import { myFirebase, db } from '../../firebase/fbConfig';
export const GET_PERSONAL_DETAILS = 'GET_PERSONAL_DETAILS';
export const POST_SOCIAL_LINKS = 'POST_SOCIAL_LINKS';

const getPersonalDetails = (details) => {
    return {
        type: GET_PERSONAL_DETAILS,
        details
    };
}

const postSocialLinks = () => {
    return {
        type: POST_SOCIAL_LINKS,
    };
}

export const personalDetails = () => dispatch => {
    myFirebase
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                db.collection('users').doc(user.uid).get()
                    .then(doc => {
                        const details = {
                            email: doc.data().email,
                            firstName: doc.data().firstName,
                            lastName: doc.data().lastName,
                            phoneNumber: doc.data().phoneNumber
                        }
                        return details;
                    })
                    .then(details => {
                        dispatch(getPersonalDetails(details));
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        })
}

export const socialLinkUpdate = (linkedinUrl, githubUrl, otherUrl) => dispatch => {
    myFirebase
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                db.collection('socialLinks').doc(user.uid).set({
                    linkedinUrl: linkedinUrl,
                    githubUrl: githubUrl,
                    otherUrl: otherUrl
                }, { merge: true })
                    .then(() => {
                        dispatch(postSocialLinks())
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        })
}

