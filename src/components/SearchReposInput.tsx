import React from 'react';
import { Input, message, Tooltip } from 'antd';
import { useSelector } from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons/lib';
import { AppState } from 'reducers';
import { RepositoriesState } from 'reducers/repositoriesReducer';
import { useSearch } from 'modules/hooks';
import { useFetchRepository } from 'modules/Repository';
const { Search } = Input;

export const SearchReposInput = () => {
    const repositories = useSelector<AppState, RepositoriesState>(state => state.repositories);

    const { inputValue, handleInputChange } = useSearch();
    const { fetchRepositories } = useFetchRepository(inputValue);

    const onSearchReposButtonPress = async () => {
        if (inputValue.length === 0) {
            return message.error('Please fill search bar before continue', 1);
        }

        fetchRepositories();
    };

    return (
        <Search
            autoFocus={true}
            className='search-row'
            value={inputValue}
            onSearch={onSearchReposButtonPress}
            onChange={handleInputChange}
            placeholder='Search github for repositories'
            loading={repositories.loading}
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
