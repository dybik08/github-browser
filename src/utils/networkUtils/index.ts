import { Repository } from '../../constants/types';

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
