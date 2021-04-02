import React, { useState } from 'react';
import './App.css';
import ReposDataTable from './components/Table';
import SearchReposInput from './components/SearchReposInput';
import RepoDetailsModal from './components/RepoDetailsModal/RepoDetailsModal';
import { Repository } from './constants/types';
import { Provider } from 'react-redux';
import configuredStore from './reducers/store';
import { PersistGate } from 'redux-persist/integration/react';
import { FavouritesContainer } from './components/Favourites/FavouritesContainer';
const { store, persistor } = configuredStore;

export function App() {
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
                            <SearchReposInput />
                            {selectedRepository && (
                                <RepoDetailsModal
                                    repository_data={selectedRepository}
                                    handleOk={handleOk}
                                    handleCancel={handleCancel}
                                />
                            )}
                            <ReposDataTable setSelectedRepository={setSelectedRepository} />
                        </div>
                        <FavouritesContainer />
                        <a href={'https://competent-visvesvaraya-333a41.netlify.app/mobile-app'}>link to mobile app</a>
                    </div>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
