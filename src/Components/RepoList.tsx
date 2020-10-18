import githubLangColors from '../github-lang-colors';
import { GitForkIcon, StarIcon } from '@primer/octicons-react';
import React from 'react';
import { Repository } from '../Constants/types';

interface RepoListProps {
    repositories: Repository[];
}

const RepoList: React.FC<RepoListProps> = ({ repositories }) => {
    const repositoryList =
        repositories &&
        repositories.map((repository: Repository) => {
            return (
                <div className='repository-list-item-container'>
                    <div className='repository-list-item-title'>{repository.name}</div>
                    <div className='repository-list-item-language'>
                        <div className='dot' style={{ backgroundColor: githubLangColors[repository.language] }} />
                        {repository.language}
                    </div>
                    <div style={{ flex: 1 }}>
                        <StarIcon className='icon' />
                        {repository.stargazers_count}
                    </div>
                    <div style={{ flex: 1 }}>
                        <GitForkIcon className='icon' />
                        {repository.forks}
                    </div>
                </div>
            );
        });

    return <>{repositoryList}</>;
};

export default RepoList;
