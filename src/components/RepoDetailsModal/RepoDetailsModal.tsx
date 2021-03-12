import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { RepoIcon, HeartFillIcon, HeartIcon } from '@primer/octicons-react';
import { fetchAdditionalUserRepos, NetworkActionNames } from '../../actions/networkActions';
import RepoList from '../RepoList/RepoList';
import RepoInfoRow from './RepoInfoRow';
import { Repository, StringMap } from '../../constants/types';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse } from 'antd';
import { addRepositoryToFavourites, removeRepositoryFromFavourites } from '../../actions/favouritesActions';
import { FavouritesReducer } from '../../reducers/favouritesReducer';
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
    const repositories = useSelector(
        (state: {
            repositories: {
                repos: Repository[];
                loading: boolean;
            };
        }) => state.repositories
    );

    const favourites = useSelector((state: { favourites: FavouritesReducer }) => state.favourites);

    const dispatch = useDispatch();

    if (!repository_data) {
        return null;
    }
    const doesRepoExistInFavourites = favourites.find(repo => repo.id === repository_data.id);

    const onCollapsePanelPress = async (id: string | string[]) => {
        // on change function returns active tab ID, string[] if nested dropdowns
        const additionalUserReposSectionName = 'other_repos';
        if (additionalUserReposSectionName === sections[id as string] && repositories.repos.length === 0) {
            const additionalUserRepos =
                repository_data && (await fetchAdditionalUserRepos(repository_data.owner.repos_url));
            dispatch({ type: NetworkActionNames.FETCHING_REPOS_DONE, payload: additionalUserRepos });
        }
    };

    const onFavouritesIconClick = () => {
        return dispatch(
            doesRepoExistInFavourites
                ? removeRepositoryFromFavourites(repository_data)
                : addRepositoryToFavourites(repository_data)
        );
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
                <div className={'repo-icon-row'}>
                    <p>
                        <RepoIcon /> {repository_data.name}
                    </p>
                    <button onClick={onFavouritesIconClick}>
                        {doesRepoExistInFavourites ? <HeartFillIcon /> : <HeartIcon />}
                    </button>
                </div>
                <p id={'repo-description'}>{repository_data.description}</p>
                <RepoInfoRow repository_data={repository_data} />
                <Collapse onChange={onCollapsePanelPress} style={{ marginTop: '20px' }} accordion>
                    <Panel header={repository_data.owner?.type} key='1'>
                        <div>
                            <img
                                height={'50px'}
                                alt='avatar'
                                className='icon'
                                src={repository_data.owner?.avatar_url}
                            />
                            {repository_data.owner?.login}
                        </div>
                    </Panel>
                    <Panel header='Repo details' key='2'>
                        <p id='created_at'>Created: {repository_data.created_at.split('T')[0]}</p>
                        <p id='updated_at'>Last change: {repository_data.updated_at.split('T')[0]}</p>
                        {repository_data.license && <p>License: {repository_data.license?.name}</p>}
                    </Panel>
                    <Panel header={repository_data.owner?.type + ' repos'} key='3'>
                        <RepoList repositories={repositories.repos} />
                    </Panel>
                </Collapse>
            </Modal>
        )
    );
};

export default RepoDetailsModal;
