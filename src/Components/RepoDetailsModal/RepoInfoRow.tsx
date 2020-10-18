import React from 'react';
import githubLangColors from '../../github-lang-colors';
import { GitForkIcon, StarIcon } from '@primer/octicons-react';
import { Repository } from '../../Constants/types';

interface RepoInfoRowProps {
    repository_data: Repository;
}

const RepoInfoRow: React.FC<RepoInfoRowProps> = ({ repository_data }) => {
    return (
        <>
            <div
                className='repository-details-modal-info-row'
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className='dot' style={{ backgroundColor: githubLangColors[repository_data.language] }} />
                    {repository_data.language}
                </div>
                <div>
                    <StarIcon className='icon' />
                    {repository_data.stargazers_count}
                </div>
                <div>
                    <GitForkIcon className='icon' />
                    {repository_data.forks}
                </div>
            </div>
        </>
    );
};

export default RepoInfoRow;
