import React from 'react';
import { Input, message, Tooltip } from 'antd';
import { NetworkActionNames } from '../actions/networkActions';
import { useDispatch, useSelector } from 'react-redux';
import { InfoCircleOutlined } from '@ant-design/icons/lib';
import { AppState } from '../reducers';
import { RepositoriesState } from '../reducers/repositoriesReducer';
import { useApi } from '../modules/API/Api.context';
const { Search } = Input;

const useSearchRepository = () => {
    const [inputValue, setInputValue] = React.useState<string>('');
    const repositories = useSelector<AppState, RepositoriesState>(state => state.repositories);
    const { repositoryApi } = useApi();
    const dispatch = useDispatch();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const onSearchReposButtonPress = async () => {
        if (inputValue.length === 0) {
            return message.error('Please fill search bar before continue', 1);
        }

        const formattedQuery = inputValue.replace('/,/g', '+');

        dispatch({ type: NetworkActionNames.START_FETCHING_REPOS });
        repositoryApi
            .getRepositories(formattedQuery)
            .then(res => {
                dispatch({ type: NetworkActionNames.FETCHING_REPOS_DONE, payload: res.items });
            })
            .catch(e => {
                dispatch({ type: NetworkActionNames.FETCHING_REPOS_ERROR, payload: e });
            });
    };

    return { inputValue, handleInputChange, onSearchReposButtonPress, repositories };
};

export const SearchReposInput = () => {
    const { inputValue, handleInputChange, onSearchReposButtonPress, repositories } = useSearchRepository();

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
