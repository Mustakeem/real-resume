import {
    GET_SKILLS,
    POST_SKILLS,
    GET_PERSONAL_DETAILS,
    POST_SOCIAL_LINKS,
    GET_SOCIAL_LINKS,
    POST_BASIC_INFO,
    GET_BASIC_INFO
} from '../actions';

export default (
    state = {
        skillsDataItems:{},
        details: {},
        socialLinks: {},
        basicInfoItems: {}
    },
    action
) => {
    switch (action.type) {
        case GET_SKILLS:
            return {
                ...state,
                skillsDataItems: action.skillsDataItems
            };
        case POST_SKILLS:
            return {
                ...state,
            };
        case POST_SOCIAL_LINKS:
            return {
                ...state
            };
        case GET_PERSONAL_DETAILS:
            return {
                ...state,
                details: action.details
            };
        case GET_SOCIAL_LINKS:
            return {
                ...state,
                socialLinks: action.socialLinks
            };
        case POST_BASIC_INFO:
            return {
                ...state,
            };
        case GET_BASIC_INFO:
            return {
                ...state,
                basicInfoItems: action.basicInfoItems
            };
        default:
            return state;
    }
};