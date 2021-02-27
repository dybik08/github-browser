const SEARCH_REPOS = (query: string) => `https://api.github.com/search/repositories?q=${query}`;

const endpoints = {
    search_repos: SEARCH_REPOS
};

export default {
    endpoints
}