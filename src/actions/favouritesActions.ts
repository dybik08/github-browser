import { IRepositoryDto } from 'modules/API';

export enum FavouritesActions {
    ADD_TO_FAVOURITE = 'ADD_TO_FAVOURITE',
    REMOVE_FROM_FAVOURITE = 'REMOVE_FROM_FAVOURITE',
}

export const addRepositoryToFavourites = (repository: IRepositoryDto) => {
    return {
        type: FavouritesActions.ADD_TO_FAVOURITE,
        payload: repository,
    };
};

export const removeRepositoryFromFavourites = (repository: IRepositoryDto) => {
    return {
        type: FavouritesActions.REMOVE_FROM_FAVOURITE,
        payload: repository,
    };
};
