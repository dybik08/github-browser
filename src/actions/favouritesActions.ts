import { Repository } from '../constants/types';

export enum FavouritesActions {
    ADD_TO_FAVOURITE = 'ADD_TO_FAVOURITE',
    REMOVE_FROM_FAVOURITE = 'REMOVE_FROM_FAVOURITE',
}

export const addRepositoryToFavourites = (repository: Repository) => {
    return {
        type: FavouritesActions.ADD_TO_FAVOURITE,
        payload: repository,
    };
};

export const removeRepositoryFromFavourites = (repository: Repository) => {
    return {
        type: FavouritesActions.REMOVE_FROM_FAVOURITE,
        payload: repository,
    };
};
