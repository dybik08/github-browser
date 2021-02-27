import React, {useState} from 'react';
import './App.css';
import ReposDataTable from './components/Table';
import SearchReposInput from "./components/SearchReposInput";
import RepoDetailsModal from "./components/RepoDetailsModal/RepoDetailsModal";
import {Repository} from "./constants/types";
import { Provider } from 'react-redux'
import store from "./reducers/store";

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
        <div className='App'>
            <header className='App-header'>Github Browser</header>
            <div style={{ margin: '10px 20px' }}>
                <SearchReposInput
                    reposLoading={reposLoading}
                    setReposLoading={setReposLoading}
                    setRepos={setRepos}
                />
                <RepoDetailsModal  repository_data={selectedRepository} handleOk={handleOk} handleCancel={handleCancel} />
                <ReposDataTable setSelectedRepository={setSelectedRepository} repos={repos} />
            </div>
        </div>
        </Provider>
    );
}

export default App;
