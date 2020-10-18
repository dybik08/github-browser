import React, {useState} from 'react';
import './App.css';
import SearchReposButton from './Components/SearchReposButton';
import TableComponent from './Components/Table';

interface repoData {
    key: string;
    login: string;
    language: string;
    stargazers_count: number;
    name: string;
}

export function App() {
    const [repos, setRepos] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [reposLoading, setReposLoading] = React.useState(false);
    const [modalVisible, setModalVisible] = useState<repoData | null>(null);


    return (
        <div className='App'>
            <header className='App-header'>Github Searcher</header>
            <div style={{ margin: '10px 20px' }}>
                <SearchReposButton
                    setInputValue={setInputValue}
                    reposLoading={reposLoading}
                    setReposLoading={setReposLoading}
                    inputValue={inputValue}
                    repos={repos}
                    setRepos={setRepos}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
                <TableComponent repos={repos} />
            </div>
        </div>
    );
}

export default App;
