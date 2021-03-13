import githubLangColors from '../../github-lang-colors';
import { GitForkIcon, StarIcon } from '@primer/octicons-react';
import React from 'react';
import { Repository } from '../../constants/types';

interface RepoListItemProps {
    repository: Repository;
    listItemKey: string;
    repoListItemStyle?: any;
}

export const RepoListItem: React.FC<RepoListItemProps> = ({ repository, listItemKey, repoListItemStyle }) => {
    return (
        <div style={repoListItemStyle} key={listItemKey} className='repository-list-item-container'>
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
};

export default RepoListItem;
