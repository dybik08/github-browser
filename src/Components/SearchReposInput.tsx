import React from 'react';
import { Button, Input, message, Tooltip } from 'antd';
import { fetchRepos } from '../actions/network_actions';
import { Repository } from '../Constants/types';
import { InfoCircleOutlined } from '@ant-design/icons/lib';
const { Search } = Input;

const formatReposResponseData = (data: any, onButtonPressCallback: (repoData: Repository) => void) => {
    return data.items.map((repoData: Repository, index: number) => ({
        key: `${index}`,
        login: repoData.owner.login,
        language: repoData.language,
        stargazers_count: repoData.stargazers_count,
        name: repoData.name,
        details: (
            <Button type='primary' onClick={e => onButtonPressCallback(repoData)}>
                Details
            </Button>
        ),
    }));
};

interface SearchReposInputProps {
    setInputValue: (inputValue: string) => void;
    reposLoading: boolean;
    setReposLoading: (loading: boolean) => void;
    inputValue: string;
    repos: Repository[] | null;
    setRepos: (repos: Repository[]) => void;
    setSelectedRepository: (repo: Repository) => void;
}

const SearchReposInput: React.FC<SearchReposInputProps> = props => {
    const { setSelectedRepository, setInputValue, setReposLoading, setRepos, inputValue, reposLoading } = props;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const onSearchReposButtonPress = async () => {
        if (inputValue.length === 0) {
            return message.error('Please fill search bar before continue', 1);
        }

        const multipleSearch = inputValue.replace(',', '+');

        setReposLoading(true);
        const { data } = await fetchRepos(multipleSearch);
        const formattedData = formatReposResponseData(data, setSelectedRepository);

        setRepos(formattedData);
        setReposLoading(false);
    };

    return (
        <Search
            className='search-row'
            value={inputValue}
            onSearch={onSearchReposButtonPress}
            onChange={event => handleInputChange(event)}
            placeholder='Search github for repositories'
            loading={reposLoading}
            enterButton
            suffix={
                <Tooltip title='Split text by comma to search for multiple items e.g. redux, react '>
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
            }
        />
    );
};

export default SearchReposInput;
