import {
    POST_WORK_EXPERIENCE,
    GET_WORK_EXPERIENCE,
    DELETE_WORK_EXPERIENCE
} from '../actions';

export default (
    state = {
        shouldDisplay: false,
        dataItems:{}
    },
    action
) => {
    switch (action.type) {
        case GET_WORK_EXPERIENCE:
            return {
                ...state,
                shouldDisplay: true,
                dataItems: action.dataItems
            };
        case POST_WORK_EXPERIENCE:
            return {
                ...state,
                shouldDisplay: true
            };
        default:
            return state;
    }
};