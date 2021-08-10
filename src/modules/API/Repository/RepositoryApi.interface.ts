import { RepositoryOwner } from '../../../constants/types';

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
