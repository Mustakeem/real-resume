import {
    POST_EDUCATION,
    GET_EDUCATION,
    DELETE_EDUCATION
} from '../actions';

export default (
    state = {
        shouldDisplay: false,
        dataItems:{}
    },
    action
) => {
    switch (action.type) {
        case GET_EDUCATION:
            return {
                ...state,
                dataItems: action.dataItems
            };
        case POST_EDUCATION:
            return {
                ...state,
                shouldDisplay: true
            };
        default:
            return state;
    }
};