import React, {useState} from 'react';
import './App.css';
import ReposDataTable from './Components/Table';
import SearchReposInput from "./Components/SearchReposInput";
import RepoDetailsModal from "./Components/RepoDetailsModal/RepoDetailsModal";
import {Repository} from "./Constants/types";


export function App() {
    const [repos, setRepos] = React.useState(null);
    const [inputValue, setInputValue] = React.useState<string>('');
    const [reposLoading, setReposLoading] = React.useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<Repository | null>(null);

    const handleOk = () => {
        setModalVisible(null);
    };

    const handleCancel = () => {
        setModalVisible(null);
    };

    return (
        <div className='App'>
            <header className='App-header'>Github Browser</header>
            <div style={{ margin: '10px 20px' }}>
                <SearchReposInput
                    setInputValue={setInputValue}
                    reposLoading={reposLoading}
                    setReposLoading={setReposLoading}
                    inputValue={inputValue}
                    repos={repos}
                    setRepos={setRepos}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
                <RepoDetailsModal repository_data={modalVisible} handleOk={handleOk} handleCancel={handleCancel} />
                <ReposDataTable repos={repos} />
            </div>
        </div>
    );
}

export default App;
