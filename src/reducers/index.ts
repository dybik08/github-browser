import { combineReducers } from 'redux';
import { repositories } from './repositoriesReducer';
import { favourites } from './favouritesReducer';

export const AppReducer = combineReducers({
    repositories,
    favourites,
});
