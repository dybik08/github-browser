import { combineReducers } from 'redux';
import { repositories, RepositoriesState } from './repositoriesReducer';
import { favourites, FavouritesState } from './favouritesReducer';

export interface AppState {
    repositories: RepositoriesState;
    favourites: FavouritesState;
}

export const AppReducer = combineReducers<AppState>({
    repositories,
    favourites,
});
