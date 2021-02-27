import { combineReducers } from 'redux';
import {repositories} from "./repositoriesReducer";


export const AppReducer = combineReducers({
    repositories,
});