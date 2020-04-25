import { combineReducers } from 'redux';
import auth from './auth';
import basicInfo from './basicInfo';
import workExperience from './workExperience';
import education from './education';
import projects from './projects';

export default combineReducers({
    auth,
    basicInfo,
    workExperience,
    education,
    projects
    
});