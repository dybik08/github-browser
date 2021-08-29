import { RepositoryOwner } from '../../../constants/types';

export interface IBackendRepositoryDto {
    id: number;
    name: string;
    description: string;
    language: string;
    stargazers_count: number;
    forks: number;
    owner: RepositoryOwner;
    created_at: string;
    updated_at: string;
    license: string;
}

export interface IRepositoryDto {
    id: number;
    name: string;
    description: string;
    language: string;
    stargazersCount: number;
    forks: number;
    owner: RepositoryOwner;
    createdAt: string;
    updatedAt: string;
    license: string;
}

export interface IRepositoryApi {
    getRepositories(
        query: string
    ): Promise<{
        items: IRepositoryDto[];
    }>;
}
