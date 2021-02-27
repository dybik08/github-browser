import { NetworkActionNames } from '../actions/networkActions';
import { Repository } from '../constants/types';
const initialState = {
    repos: [],
    loading: false,
};

export const repositories = (state = initialState, action: { type: string; payload: any }) => {
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
                repos: action.payload.map((repo: Repository, index: number) => {
                    return {
                        key: `${index}`,
                        login: repo.owner.login,
                        language: repo.language,
                        stargazers_count: repo.stargazers_count,
                        name: repo.name,
                        owner: repo.owner,
                        created_at: repo.created_at,
                        updated_at: repo.updated_at,
                        license: repo.license,
                        description: repo.description,
                        forks: repo.forks,
                    };
                }),
                loading: false,
            };
        default:
            return state;
    }
};
