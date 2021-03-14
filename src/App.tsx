import React, { useState } from 'react';
import './App.css';
import ReposDataTable from './components/Table';
import SearchReposInput from './components/SearchReposInput';
import RepoDetailsModal from './components/RepoDetailsModal/RepoDetailsModal';
import { Repository } from './constants/types';
import { Provider, useDispatch, useSelector } from 'react-redux';
import configuredStore from './reducers/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AppState } from './reducers';
import { FavouritesState } from './reducers/favouritesReducer';
import { HeartFillIcon, XCircleIcon } from '@primer/octicons-react';
import { removeRepositoryFromFavourites } from './actions/favouritesActions';
import RepoListItem from './components/RepoList/RepoListItem';
const { store, persistor } = configuredStore;

function FavouritesContainer() {
    // use state to temporary keep favourite even if user removed it
    const favourites = useSelector<AppState, FavouritesState>(state => state.favourites);
    const dispatch = useDispatch();

    const onFavouritesIconClick = (repository_data: Repository) => {
        return dispatch(removeRepositoryFromFavourites(repository_data));
    };

    const favouriteRepos = favourites.map((repository: Repository, index: number) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <RepoListItem
                    repoListItemStyle={{ flex: 9 }}
                    listItemKey={repository.name + index}
                    repository={repository}
                />
                <button style={{ flex: 1 }} onClick={() => onFavouritesIconClick(repository)}>
                    <XCircleIcon size={20} />
                </button>
            </div>
        );
    });

    return (
        <div style={{ flex: 2 }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <p className={'favourites'}>Your favourite repos</p>
                <HeartFillIcon />
            </div>
            {favouriteRepos}
        </div>
    );
}

export function App() {
    const [repos, setRepos] = React.useState<Repository[] | null>(null);
    const [reposLoading, setReposLoading] = React.useState<boolean>(false);
    const [selectedRepository, setSelectedRepository] = useState<Repository | null>(null);
    const handleOk = () => {
        setSelectedRepository(null);
    };

    const handleCancel = () => {
        setSelectedRepository(null);
    };

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className='App'>
                    <header className='App-header'>Github Browser</header>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div style={{ margin: '10px 20px', flex: 4 }}>
                            <SearchReposInput
                                reposLoading={reposLoading}
                                setReposLoading={setReposLoading}
                                setRepos={setRepos}
                            />
                            {selectedRepository && (
                                <RepoDetailsModal
                                    repository_data={selectedRepository}
                                    handleOk={handleOk}
                                    handleCancel={handleCancel}
                                />
                            )}
                            <ReposDataTable setSelectedRepository={setSelectedRepository} repos={repos} />
                        </div>
                        <FavouritesContainer />
                    </div>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
