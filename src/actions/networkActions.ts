import axios from 'axios';
import API from '../constants/API';
import { AppDispatch } from '../reducers/store';

export enum NetworkActionNames {
    FETCH_REPOS = 'FETCH_REPOS',
    FETCH_REPOS_ADDITIONAL_USER_REPOS = 'FETCH_REPOS_ADDITIONAL_USER_REPOS',
    FETCHING_REPOS_DONE = 'FETCHING_REPOS_DONE',
    FETCHING_REPOS_ERROR = 'FETCHING_REPOS_ERROR',
    START_FETCHING_REPOS = 'START_FETCHING_REPOS',
}

export const fetchRepos = (query: string): ((dispatch: AppDispatch) => void) => {
    return dispatch => {
        dispatch({ type: NetworkActionNames.START_FETCHING_REPOS });
        return axios
            .get(API.endpoints.search_repos(query))
            .then(res => {
                dispatch({ type: NetworkActionNames.FETCHING_REPOS_DONE, payload: res.data.items });
            })
            .catch(e => {
                dispatch({ type: NetworkActionNames.FETCHING_REPOS_ERROR, payload: e });
            });
    };
};

export const fetchAdditionalUserRepos = async (userReposUrl: string) => {
    const { data } = await axios.get(userReposUrl);
    return data;
};
