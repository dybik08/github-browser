import React, {useState} from 'react';
import './App.css';
import ReposDataTable from './components/Table';
import SearchReposInput from './components/SearchReposInput';
import RepoDetailsModal from './components/RepoDetailsModal/RepoDetailsModal';
import {Repository} from './constants/types';
import {Provider} from 'react-redux';
import configuredStore from './reducers/store';
import {PersistGate} from 'redux-persist/integration/react';
import {FavouritesContainer} from './components/Favourites/FavouritesContainer';

const {store, persistor} = configuredStore;

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
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{margin: '10px 20px', flex: 4}}>
                            <SearchReposInput/>
                            {selectedRepository && (
                                <RepoDetailsModal
                                    repository_data={selectedRepository}
                                    handleOk={handleOk}
                                    handleCancel={handleCancel}
                                />
                            )}
                            <ReposDataTable setSelectedRepository={setSelectedRepository}/>
                        </div>
                        <FavouritesContainer/>
                        <a href={'trapp://?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJydW5faWQiOjY3NjkxLCJkcml2ZXJfaWQiOjEyODkzLCJzY2VuYXJpb19pZCI6NzEwNiwid3NfdG9rZW4iOiI0YmEzODI5Ni04ODQyLTRhZGMtYjIxYi1iYjQ2YjFkNzcwZDEiLCJvcmdhbmlzYXRpb25faWQiOjgsImFsbF9jaGlsZF9pZHMiOls4LDU0LDU2LDU3LDU4LDU5LDYwLDYxXX0.xoGLWXTUw_sijbX4SzCdke3tsGtbMUA6S_VfmU6I1wo'}>
                            link to mobile app custom uri
                        </a>
                    </div>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
