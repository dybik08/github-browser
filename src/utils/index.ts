import { Repository } from '../constants/types';

export const formatReposResponseData = (data: { items: Repository[] }): Repository[] => {
    return data.items.map((repoData: Repository, index: number) => ({
        id: repoData.id,
        key: `${index}`,
        login: repoData.owner.login,
        language: repoData.language,
        stargazers_count: repoData.stargazers_count,
        name: repoData.name,
        owner: repoData.owner,
        created_at: repoData.created_at,
        updated_at: repoData.updated_at,
        license: repoData.license,
        description: repoData.description,
        forks: repoData.forks,
    }));
};
