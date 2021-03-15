import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { RepoIcon } from '@primer/octicons-react';
import { fetchAdditionalUserRepos } from '../../actions/networkActions';
import RepoList from '../RepoList/RepoList';
import RepoInfoRow from './RepoInfoRow';
import { Repository } from '../../constants/types';
import { Collapse } from 'antd';
import { FavouritesIcon } from '../Favourites/FavouritesIcon';
const { Panel } = Collapse;

interface RepoDetailsModalProps {
    repository_data: Repository;
    handleOk: () => void;
    handleCancel: () => void;
}

export const RepoDetailsModal: React.FC<RepoDetailsModalProps> = ({ repository_data, handleOk, handleCancel }) => {
    const [additionalUserRepos, setAdditionalUserRepos] = React.useState<Repository[]>([]);

    useEffect(() => {
        if (additionalUserRepos.length === 0) {
            fetchAdditionalUserRepos(repository_data.owner.repos_url).then(additionalUserRepos => {
                setAdditionalUserRepos(additionalUserRepos);
            });
        }
    }, [additionalUserRepos]);

    return (
        <Modal
            width={window.innerWidth * 0.7}
            okButtonProps={{ style: { display: 'none' } }}
            title={repository_data.name.toUpperCase()}
            visible={repository_data !== null}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div className={'repo-icon-row'}>
                <p>
                    <RepoIcon /> {repository_data.name}
                </p>
                <FavouritesIcon repository={repository_data} />
            </div>
            <p id={'repo-description'}>{repository_data.description}</p>
            <RepoInfoRow repository_data={repository_data} />
            <Collapse style={{ marginTop: '20px' }} accordion>
                <Panel header={repository_data.owner?.type} key='1'>
                    <div>
                        <img height={'50px'} alt='avatar' className='icon' src={repository_data.owner?.avatar_url} />
                        {repository_data.owner?.login}
                    </div>
                </Panel>
                <Panel header='Repo details' key='2'>
                    <p id='created_at'>Created: {repository_data.created_at}</p>
                    <p id='updated_at'>Last change: {repository_data.updated_at}</p>
                    {repository_data.license && <p>License: {repository_data.license?.name}</p>}
                </Panel>
                <Panel header={repository_data.owner?.type + ' repos'} key='3'>
                    <RepoList repositories={additionalUserRepos} />
                </Panel>
            </Collapse>
        </Modal>
    );
};

export default RepoDetailsModal;
