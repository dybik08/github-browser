import React from 'react';
import { Button, Input, message, Tooltip } from 'antd';
import { fetchRepos } from '../actions/networkActions';
import { Repository } from '../Constants/types';
import { InfoCircleOutlined } from '@ant-design/icons/lib';
const { Search } = Input;

const formatReposResponseData = (data: { items: Repository[] }): Repository[] => {
    return data.items.map((repoData: Repository, index: number) => ({
        key: `${index}`,
        login: repoData.owner.login,
        language: repoData.language,
        stargazers_count: repoData.stargazers_count,
        name: repoData.name,
        owner: repoData.owner,
        created_at: repoData.created_at,
        updated_at: repoData.updated_at,
        license: repoData.license,
        description: repoData.description,
        forks: repoData.forks,
    }));
};

interface SearchReposInputProps {
    reposLoading: boolean;
    setReposLoading: (loading: boolean) => void;
    setRepos: (repos: Repository[]) => void;
}

const SearchReposInput: React.FC<SearchReposInputProps> = props => {
    const { setReposLoading, setRepos, reposLoading } = props;
    const [inputValue, setInputValue] = React.useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const onSearchReposButtonPress = async () => {
        if (inputValue.length === 0) {
            return message.error('Please fill search bar before continue', 1);
        }

        const multipleSearch = inputValue.replace('/,/g', '+');

        setReposLoading(true);
        const { data } = await fetchRepos(multipleSearch);
        const formattedData = formatReposResponseData(data);

        setRepos(formattedData);
        setReposLoading(false);
    };

    return (
        <Search
            autoFocus={true}
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
