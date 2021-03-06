import React from 'react';
import { Button, Input, message, Tooltip } from 'antd';
import { fetchRepos } from '../actions/networkActions';
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons/lib';
import { AppState } from '../reducers';
import { RepositoriesState } from '../reducers/repositoriesReducer';
const { Search } = Input;

const SearchReposInput = () => {
    const [inputValue, setInputValue] = React.useState<string>('');
    const repositories = useSelector<AppState, RepositoriesState>(state => state.repositories);
    const dispatch = useDispatch();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const onSearchReposButtonPress = async () => {
        if (inputValue.length === 0) {
            return message.error('Please fill search bar before continue', 1);
        }

        const handleMultipleSearch = inputValue.replace('/,/g', '+');

        dispatch(fetchRepos(handleMultipleSearch));
    };

    return (
        <Search
            autoFocus={true}
            className='search-row'
            value={inputValue}
            onSearch={onSearchReposButtonPress}
            onChange={event => handleInputChange(event)}
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
