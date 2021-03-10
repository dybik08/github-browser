export interface StringMap {
    [key: string]: string;
}

export interface RepositoryOwner {
    repos_url: string;
    type: string;
    avatar_url: string;
    login: string;
}

export interface Repository {
    id: number;
    name: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks: number;
    owner: RepositoryOwner;
    created_at: string;
    updated_at: string;
    license: {
        name: string;
    };
}
