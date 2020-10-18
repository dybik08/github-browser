import React, { useState } from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
import RepoDetailsModal from './RepoDetailsModal';
import { fetchRepos } from '../actions/network_actions';

const { Search } = Input;

interface repoData {
    key: string;
    login: string;
    language: string;
    stargazers_count: number;
    name: string;
}

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

const SearchReposButton = (props: any) => {
    const {
        setModalVisible,
        modalVisible
    } = props;
    const onSearchReposButtonPress = async () => {
        props.setReposLoading(true);
        const { data } = await fetchRepos(props.inputValue);
        const formattedData = formatResponseData(data, setModalVisible);

        props.setRepos(formattedData);
        props.setReposLoading(false);
    };

    const handleInputChange = (event: any) => {
        props.setInputValue(event.target.value);
    };

    const handleOk = (e: any) => {
        setModalVisible(null);
    };

    const handleCancel = (e: any) => {
        setModalVisible(null);
    };

    return (
        <>
            <RepoDetailsModal visible={modalVisible} handleOk={handleOk} handleCancel={handleCancel} />
            <Search
                className='search-row'
                value={props.inputValue}
                onSearch={onSearchReposButtonPress}
                onChange={event => handleInputChange(event)}
                placeholder='input search loading with enter button'
                loading={props.reposLoading}
                enterButton
            />
        </>
    );
};

export default SearchReposButton;
