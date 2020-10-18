import React from 'react';
import { Button, Input } from 'antd';
import { fetchRepos } from '../actions/network_actions';
const { Search } = Input;

const formatResponseData = (data: any, onButtonPressCallback: (data: any) => void) => {
    return data.items.map((repoData: any, index: number) => ({
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

const SearchReposInput = (props: any) => {
    const { setModalVisible } = props;

    const handleInputChange = (event: any) => {
        props.setInputValue(event.target.value);
    };

    const onSearchReposButtonPress = async () => {
        props.setReposLoading(true);
        const { data } = await fetchRepos(props.inputValue);
        const formattedData = formatResponseData(data, setModalVisible);

        props.setRepos(formattedData);
        props.setReposLoading(false);
    };

    return (
        <Search
            className='search-row'
            value={props.inputValue}
            onSearch={onSearchReposButtonPress}
            onChange={event => handleInputChange(event)}
            placeholder='input search loading with enter button'
            loading={props.reposLoading}
            enterButton
        />
    );
};

export default SearchReposInput;
