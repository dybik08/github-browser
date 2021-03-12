import { FavouritesActions } from '../actions/favouritesActions';
import { Repository } from '../constants/types';
import _ from 'lodash';
export type FavouritesReducer = Repository[];

const favouritesReducerInitialState: FavouritesReducer = [];

export const favourites = (
    state: FavouritesReducer = favouritesReducerInitialState,
    action: { type: string; payload: any }
): FavouritesReducer => {
    switch (action.type) {
        case FavouritesActions.ADD_TO_FAVOURITE:
            return [...state, action.payload];
        case FavouritesActions.REMOVE_FROM_FAVOURITE:
            return state.filter(repository => repository.id !== action.payload.id);
        default:
            return state;
    }
};
