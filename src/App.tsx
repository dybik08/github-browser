import React from 'react';
import './App.css';
import SearchReposButton from './Components/SearchReposButton';
import SearchReposResults from './Components/SearchReposResults';
import TableComponent from './Components/Table';
import SearchReposInput from './Components/SearchReposInput';
import { Button } from 'antd';

function App() {
    const [repos, setRepos] = React.useState(null);
    const [pagination, setPagination] = React.useState(5);
    const [inputValue, setInputValue] = React.useState('');
    const [reposLoading, setReposLoading] = React.useState(false);

    return (
        <div className='App'>
            <header className='App-header'>Github Searcher</header>
            <div style={{ margin: '10px 20px' }}>
                <SearchReposButton
                    setInputValue={setInputValue}
                    reposLoading={reposLoading}
                    setReposLoading={setReposLoading}
                    inputValue={inputValue}
                    pagination={pagination}
                    repos={repos}
                    setRepos={setRepos}
                />
                <div>
                    <h1>Fetch results: </h1>
                    <Button
                        size='small'
                        type={pagination === 5 ? 'primary' : 'default'}
                        style={{ margin: '0px 10px' }}
                        onClick={() => setPagination(5)}
                    >
                        5
                    </Button>
                    <Button
                        size='small'
                        type={pagination === 10 ? 'primary' : 'default'}
                        style={{ margin: '0px 10px' }}
                        onClick={() => setPagination(10)}
                    >
                        10
                    </Button>
                    <Button
                        size='small'
                        type={pagination === 15 ? 'primary' : 'default'}
                        style={{ margin: '0px 10px' }}
                        onClick={() => setPagination(15)}
                    >
                        15
                    </Button>
                </div>
                <TableComponent repos={repos} />
            </div>
        </div>
    );
}

export default App;
