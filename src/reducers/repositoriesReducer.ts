import { NetworkActionNames } from '../actions/networkActions';
import { Repository } from '../constants/types';
import { repositoriesResponseHandler } from '../utils/networkUtils';
import { IRepositoryDto } from '../modules/API/Repository/RepositoryApi.interface';

export const repositoriesReducerInitialState = {
    repos: [],
    loading: false,
};

export interface RepositoriesState {
    repos: IRepositoryDto[];
    loading: boolean;
}

export const repositories = (
    state: RepositoriesState = repositoriesReducerInitialState,
    action: { type: string; payload: any }
): RepositoriesState => {
    switch (action.type) {
        case NetworkActionNames.FETCH_REPOS:
            return state;
        case NetworkActionNames.FETCH_REPOS_ADDITIONAL_USER_REPOS:
            return state;
        case NetworkActionNames.START_FETCHING_REPOS:
            return {
                ...state,
                loading: true,
            };
        case NetworkActionNames.FETCHING_REPOS_ERROR:
            return {
                ...state,
                loading: false,
            };
        case NetworkActionNames.FETCHING_REPOS_DONE:
            return {
                ...state,
                repos: repositoriesResponseHandler(action.payload),
                loading: false,
            };
        default:
            return state;
    }
};
