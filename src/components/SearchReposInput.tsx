import React from 'react';
import { Input, message, Tooltip } from 'antd';
import { fetchRepos } from '../actions/networkActions';
import { useDispatch, useSelector } from 'react-redux';
import { Repository } from '../constants/types';
import { InfoCircleOutlined } from '@ant-design/icons/lib';
import { AppState } from '../reducers';
import { RepositoriesState } from '../reducers/repositoriesReducer';
const { Search } = Input;

interface SearchReposInputProps {
    reposLoading: boolean;
    setReposLoading: (loading: boolean) => void;
    setRepos: (repos: Repository[]) => void;
}

const SearchReposInput: React.FC<SearchReposInputProps> = props => {
    const repositories = useSelector<AppState, RepositoriesState>(state => state.repositories);
    const dispatch = useDispatch();

    const onSearchReposButtonPress = async (searchText: string) => {
        if (searchText.length === 0) {
            return message.error('Please fill search bar before continue', 1);
        }

        const handleMultipleSearch = searchText.replace('/,/g', '+');

        dispatch(fetchRepos(handleMultipleSearch));
    };

    return (
        <Search
            autoFocus={true}
            className='search-row'
            onSearch={onSearchReposButtonPress}
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
