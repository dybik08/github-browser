import React, {useState} from 'react';
import './App.css';
import ReposDataTable from './Components/Table';
import SearchReposInput from "./Components/SearchReposInput";
import RepoDetailsModal from "./Components/RepoDetailsModal/RepoDetailsModal";
import {Repository} from "./Constants/types";


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
    );
}

export default App;
