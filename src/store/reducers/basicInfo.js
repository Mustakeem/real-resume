import {
    GET_PERSONAL_DETAILS,
    POST_SOCIAL_LINKS
} from '../actions';

export default (
    state = {

    },
    action
) => {
    switch (action.type) {
        case POST_SOCIAL_LINKS:
            return {
                ...state
            };
        case GET_PERSONAL_DETAILS:
            return action.details;
        default:
            return state;
    }
};