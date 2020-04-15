import { myFirebase, db } from '../../firebase/fbConfig';

export const GET_ALL_DETAILS = 'GET_ALL_DETAILS';

const getDetails = dataItems => {
    return {
        type: GET_ALL_DETAILS,
        dataItems
    };
};


export const getAllDetails = () => dispatch => {

    myFirebase
        .auth()
        .onAuthStateChanged(user => {
            if (user) {
                basicInfoRef.where('userId', '==', user.uid).get()
                    .then(querySnapshot => {
                        const data = querySnapshot.docs.map((documentSnapshot) => {
                            return documentSnapshot.data();
                        });
                        const basicInfoData = data.map((dataItem) => {
                            return dataItem
                        });
                        console.table(basicInfoData);
                        return basicInfoData;
                    })
                    .then((dataItems) => {
                        dispatch(getDetails(dataItems));
                    })
                    .catch(error => {
                        console.log(error);
                    });

            }
        })
};

