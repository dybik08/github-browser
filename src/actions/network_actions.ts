import axios from "axios";
import API from "../Constants/API";


export const fetchRepos = (query: string) => {
    return axios.get(API.endpoints.search_repos(query))
};

export const fetchAdditionalUserRepos = async (userReposUrl: string) => {
    const {data} = await axios.get(userReposUrl);
    return data;
};