import { NetworkActionNames } from '../actions/networkActions';
import { Repository } from '../constants/types';

export const repositoriesReducerInitialState = {
    repos: [],
    loading: false,
};

export const repositoriesResponseHandler = (repositories: Repository[]): Repository[] => {
    return repositories.map((repo: Repository, index: number) => {
        return {
            id: repo.id,
            key: `${index}`,
            login: repo.owner.login,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            name: repo.name,
            owner: repo.owner,
            created_at: new Date(repo.created_at).toString(),
            updated_at: new Date(repo.updated_at).toString(),
            license: repo.license,
            description: repo.description,
            forks: repo.forks,
        };
    });
};

export interface RepositoriesState {
    repos: Repository[];
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
