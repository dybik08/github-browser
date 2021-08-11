import { Repository } from '../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../reducers';
import { FavouritesState } from '../../reducers/favouritesReducer';
import { addRepositoryToFavourites, removeRepositoryFromFavourites } from '../../actions/favouritesActions';
import { HeartFillIcon, HeartIcon } from '@primer/octicons-react';
import React from 'react';
import { IRepositoryDto } from '../../modules/API/Repository/RepositoryApi.interface';

export function FavouritesIcon(props: { repository: IRepositoryDto }) {
    const favourites = useSelector<AppState, FavouritesState>(state => state.favourites);
    const dispatch = useDispatch();

    const doesRepoExistInFavourites = favourites.find(repo => repo.id === props.repository.id);

    const onFavouritesIconClick = () => {
        return dispatch(
            doesRepoExistInFavourites
                ? removeRepositoryFromFavourites(props.repository)
                : addRepositoryToFavourites(props.repository)
        );
    };

    return (
        <button onClick={onFavouritesIconClick}>{doesRepoExistInFavourites ? <HeartFillIcon /> : <HeartIcon />}</button>
    );
}
