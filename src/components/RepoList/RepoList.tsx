import React from 'react';
import { Repository } from '../../constants/types';
import RepoListItem from './RepoListItem';
import { IRepositoryDto } from '../../modules/API/Repository/RepositoryApi.interface';

interface RepoListProps {
    repositories: IRepositoryDto[];
}

const RepoList: React.FC<RepoListProps> = ({ repositories }) => {
    if (!repositories) {
        return null;
    }

    const repositoryList = repositories.map((repository: IRepositoryDto, index: number) => {
        return <RepoListItem listItemKey={repository.name + index} repository={repository} />;
    });

    return <>{repositoryList}</>;
};

export default RepoList;
