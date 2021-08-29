import { FavouritesActions } from '../actions/favouritesActions';
import { IRepositoryDto } from '../modules/API/Repository/RepositoryApi.interface';
export type FavouritesState = IRepositoryDto[];

const favouritesReducerInitialState: FavouritesState = [];

export const favourites = (
    state: FavouritesState = favouritesReducerInitialState,
    action: { type: string; payload: any }
): FavouritesState => {
    switch (action.type) {
        case FavouritesActions.ADD_TO_FAVOURITE:
            return [...state, action.payload];
        case FavouritesActions.REMOVE_FROM_FAVOURITE:
            return state.filter(repository => repository.id !== action.payload.id);
        default:
            return state;
    }
};
