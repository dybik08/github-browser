import axios from 'axios';

export enum NetworkActionNames {
    FETCH_REPOS = 'FETCH_REPOS',
    FETCH_REPOS_ADDITIONAL_USER_REPOS = 'FETCH_REPOS_ADDITIONAL_USER_REPOS',
    FETCHING_REPOS_DONE = 'FETCHING_REPOS_DONE',
    FETCHING_REPOS_ERROR = 'FETCHING_REPOS_ERROR',
    START_FETCHING_REPOS = 'START_FETCHING_REPOS',
}

export const fetchAdditionalUserRepos = async (userReposUrl: string) => {
    const { data } = await axios.get(userReposUrl);
    return data;
};
