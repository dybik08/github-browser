import React, { useState } from 'react';
import './App.css';
import ReposDataTable from './components/Table';
import SearchReposInput from './components/SearchReposInput';
import RepoDetailsModal from './components/RepoDetailsModal/RepoDetailsModal';
import { Repository } from './constants/types';
import { Provider } from 'react-redux';
import configuredStore from './reducers/store';
import { PersistGate } from 'redux-persist/integration/react';
const { store, persistor } = configuredStore;

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
                    <div style={{ margin: '10px 20px' }}>
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
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
