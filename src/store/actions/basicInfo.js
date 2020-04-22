import { myFirebase, db } from '../../firebase/fbConfig';
export const GET_PERSONAL_DETAILS = 'GET_PERSONAL_DETAILS';
export const POST_SOCIAL_LINKS = 'POST_SOCIAL_LINKS';
export const GET_SOCIAL_LINKS = 'GET_SOCIAL_LINKS';
export const POST_BASIC_INFO = 'POST_BASIC_INFO';
export const GET_BASIC_INFO = 'GET_BASIC_INFO';

const getPersonalDetails = (details) => {
    return {
        type: GET_PERSONAL_DETAILS,
        details
    };
};

const postSocialLinks = () => {
    return {
        type: POST_SOCIAL_LINKS,
    };
};

const getSocialLinks = (socialLinks) => {
    return {
        type: GET_SOCIAL_LINKS,
        socialLinks
    };
};

const postBasicInfo = () => {
    return {
        type: POST_BASIC_INFO
    };
};

const getBasicInfo = (basicInfoItems) => {
    return {
        type: GET_BASIC_INFO,
        basicInfoItems
    };
};




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

export const createBasicInfo = (majorCategory, description) => dispatch => {
    myFirebase
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                db.collection('basicInfo').doc(user.uid).set({
                    majorCategory: majorCategory,
                    description: description,
                }, { merge: true })
                    .then(() => {
                        dispatch(postBasicInfo())
                    })
                    .catch(error => {
                        console.log(error);
                    });

            }
        })
}

export const showBasicInfo = () => dispatch => {
    myFirebase
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                db.collection('basicInfo').doc(user.uid).get()
                    .then(doc => {
                        const basicInfoItems = {
                            majorCategory: doc.data().majorCategory,
                            description: doc.data().description
                        }
                        return basicInfoItems;
                    })
                    .then((basicInfoItems) => {
                        dispatch(getBasicInfo(basicInfoItems))
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
};

export const showSocialLinks = () => dispatch => {
    myFirebase
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                db.collection('socialLinks').doc(user.uid).get()
                    .then(doc => {
                        const socialLinks = {
                            githubUrl: doc.data().githubUrl,
                            linkedinUrl: doc.data().linkedinUrl,
                            otherUrl: doc.data().otherUrl
                        }
                        return socialLinks;
                    })
                    .then((socialLinks) => {
                        dispatch(getSocialLinks(socialLinks));
                    })
                    .catch(error => {
                        console.log(error);
                    });

            }
        })
}

