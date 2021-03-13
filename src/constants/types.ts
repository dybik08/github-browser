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
    archive_url?: string;
    assignees_url?: string;
    blobs_url?: string;
    branches_url?: string;
    clone_url?: string;
    collaborators_url?: string;
    comments_url?: string;
    commits_url?: string;
    compare_url?: string;
    contents_url?: string;
    contributors_url?: string;
    default_branch?: string;
}
