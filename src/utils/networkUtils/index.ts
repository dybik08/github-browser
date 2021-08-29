import { IBackendRepositoryDto, IRepositoryDto } from '../../modules/API/Repository/RepositoryApi.interface';

export const repositoriesResponseHandler = (repositories: IBackendRepositoryDto[]): IRepositoryDto[] => {
    return repositories.map((repo: IBackendRepositoryDto, index: number) => {
        return {
            id: repo.id,
            key: `${index}`,
            login: repo.owner.login,
            language: repo.language,
            stargazersCount: repo.stargazers_count,
            name: repo.name,
            owner: repo.owner,
            createdAt: new Date(repo.created_at).toString(),
            updatedAt: new Date(repo.updated_at).toString(),
            license: repo.license,
            description: repo.description,
            forks: repo.forks,
        };
    });
};
