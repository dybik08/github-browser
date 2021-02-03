import React, { useState } from 'react';
import { Modal } from 'antd';
import { RepoIcon } from '@primer/octicons-react';
import { Collapse } from 'antd';
import { fetchAdditionalUserRepos } from '../../actions/networkActions';
import RepoList from '../RepoList/RepoList';
import RepoInfoRow from './RepoInfoRow';
import { Repository, StringMap } from '../../Constants/types';

const { Panel } = Collapse;

const sections: StringMap = {
    '1': 'owner_type',
    '2': 'repo_details',
    '3': 'other_repos',
};

interface RepoDetailsModalProps {
    repository_data: Repository | null;
    handleOk: () => void;
    handleCancel: () => void;
}

export const RepoDetailsModal: React.FC<RepoDetailsModalProps> = ({ repository_data, handleOk, handleCancel }) => {
    const [reposData, setReposData] = useState([]);

    const onCollapsePanelPress = async (id: string | string[]) => {
        // on change function returns active tab ID, string[] if nested dropdowns
        const additionalUserReposSectionName = 'other_repos';
        if (additionalUserReposSectionName === sections[id as string] && reposData.length === 0) {
            const additionalUserRepos =
                repository_data && (await fetchAdditionalUserRepos(repository_data.owner.repos_url));
            setReposData(additionalUserRepos);
        }
    };

    return (
        repository_data && (
            <Modal
                width={window.innerWidth * 0.7}
                okButtonProps={{ style: { display: 'none' } }}
                title={repository_data.name.toUpperCase()}
                visible={repository_data !== null}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>
                    <RepoIcon /> {repository_data.name}
                </p>
                <p id={'repo-description'}>{repository_data.description}</p>
                <RepoInfoRow repository_data={repository_data} />
                <Collapse onChange={onCollapsePanelPress} style={{ marginTop: '20px' }} accordion>
                    <Panel header={repository_data.owner?.type} key='1'>
                        <div>
                            <img height={'50px'} alt='avatar' className='icon' src={repository_data.owner?.avatar_url} />
                            {repository_data.owner?.login}
                        </div>
                    </Panel>
                    <Panel header='Repo details' key='2'>
                        <p id='created_at'>Created: {repository_data.created_at.split('T')[0]}</p>
                        <p id='updated_at'>Last change: {repository_data.updated_at.split('T')[0]}</p>
                        {repository_data.license && <p>License: {repository_data.license?.name}</p>}
                    </Panel>
                    <Panel header={repository_data.owner?.type + ' repos'} key='3'>
                        <RepoList repositories={reposData} />
                    </Panel>
                </Collapse>
            </Modal>
        )
    );
};

export default RepoDetailsModal;
