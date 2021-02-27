import React from 'react';
import { Repository } from '../../constants/types';
import RepoListItem from "./RepoListItem";

interface RepoListProps {
    repositories: Repository[];
}

const RepoList: React.FC<RepoListProps> = ({ repositories }) => {
    if(!repositories){
        return null
    }

    const repositoryList = repositories.map((repository: Repository, index: number) => {
            return <RepoListItem listItemKey={repository.name + index} repository={repository}/>
        });

    return <>{repositoryList}</>;
};

export default RepoList;
