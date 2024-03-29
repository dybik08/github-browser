import React from 'react';
import githubLangColors from '../../github-lang-colors';
import { GitForkIcon, StarIcon } from '@primer/octicons-react';
import { Repository } from '../../constants/types';
import { IRepositoryDto } from '../../modules/API/Repository/RepositoryApi.interface';

interface RepoInfoRowProps {
    repository_data: IRepositoryDto;
}

export const RepoInfoRow: React.FC<RepoInfoRowProps> = ({ repository_data }) => {
    return (
        <>
            <div className='repository-details-modal-info-row'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className='dot' style={{ backgroundColor: githubLangColors[repository_data.language] }} />
                    <div id='language'>{repository_data.language}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <StarIcon className='icon' />
                    <div id={'stargazersCount'}>{repository_data.stargazersCount}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <GitForkIcon className='icon' />
                    <div id={'forks'}>{repository_data.forks}</div>
                </div>
            </div>
        </>
    );
};

export default RepoInfoRow;
