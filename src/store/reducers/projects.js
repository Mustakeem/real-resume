import {
    POST_PROJECT,
    GET_PROJECT,
    DELETE_PROJECT
} from '../actions';

export default (
    state = {
        shouldDisplay: false,
        dataItems:{}
    },
    action
) => {
    switch (action.type) {
        case GET_PROJECT:
            return {
                ...state,
                shouldDisplay: true,
                dataItems: action.dataItems
            };
        case POST_PROJECT:
            return {
                ...state,
                shouldDisplay: true
            };
        default:
            return state;
    }
};