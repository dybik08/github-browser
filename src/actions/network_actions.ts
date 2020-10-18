import axios from "axios";
import API from "../Constants/API";


export const fetchRepos = (query: string) => {
    return axios.get(API.endpoints.search_repos(query))
};