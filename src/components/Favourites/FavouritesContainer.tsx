import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../reducers';
import { FavouritesState } from '../../reducers/favouritesReducer';
import { Repository } from '../../constants/types';
import { removeRepositoryFromFavourites } from '../../actions/favouritesActions';
import RepoListItem from '../RepoList/RepoListItem';
import { HeartFillIcon, XCircleIcon } from '@primer/octicons-react';
import React from 'react';
import { IRepositoryDto } from '../../modules/API/Repository/RepositoryApi.interface';

export function FavouritesContainer() {
    const favourites = useSelector<AppState, FavouritesState>(state => state.favourites);
    const dispatch = useDispatch();

    const onFavouritesIconClick = (repository_data: IRepositoryDto) => {
        return dispatch(removeRepositoryFromFavourites(repository_data));
    };

    const favouriteRepos = favourites.map((repository: IRepositoryDto, index: number) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <RepoListItem
                    repoListItemStyle={{ flex: 9 }}
                    listItemKey={repository.name + index}
                    repository={repository}
                />
                <button style={{ flex: 1 }} onClick={() => onFavouritesIconClick(repository)}>
                    <XCircleIcon size={20} />
                </button>
            </div>
        );
    });

    return (
        <div style={{ flex: 2 }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <p className={'favourites'}>Your favourite repos</p>
                <HeartFillIcon />
            </div>
            {favouriteRepos}
        </div>
    );
}
