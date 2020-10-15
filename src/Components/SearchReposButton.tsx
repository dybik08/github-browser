import React, {useState} from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { Input } from 'antd';
import RepoDetailsModal from "./RepoDetailsModal";

const { Search } = Input;

interface repoData {
    key: string
    login: string
    language: string
    stargazers_count: number
    name: string
}

const SearchReposButton = (props: any) => {
    const [visible, setVisible ] = useState<repoData | null>(null);

    const onSearchReposButtonPress = () => {
        props.setReposLoading(true);
        axios.get(`https://api.github.com/search/repositories?q=${props.inputValue}&per_page=${props.pagination}`).then(res => {
            const formatData = res.data.items.map((data: any, index: number) => {
                const dataObject = {
                    key: `${index}`,
                    login: data.owner.login,
                    language: data.language,
                    stargazers_count: data.stargazers_count,
                    name: data.name,
                };
                console.log('data from backend: ', data);
                return {
                    ...dataObject,
                    details: <Button type='primary' onClick={e => setVisible(data)}>Details</Button>,
                };
            });

            props.setRepos(formatData);
            setTimeout(() => {
                props.setReposLoading(false)
            }, 500)
        });
    };

    const handleInputChange = (event: any) => {
        props.setInputValue(event.target.value);
    };

    const handleOk = (e: any) => {
        setVisible(null)
    };

    const handleCancel = (e: any) => {
        setVisible(null)
    };

    return (
        <>
            <RepoDetailsModal visible={visible} handleOk={handleOk} handleCancel={handleCancel}  />
            <Search value={props.inputValue} onSearch={onSearchReposButtonPress}  onChange={event => handleInputChange(event)} placeholder="input search loading with enterButton" loading={props.reposLoading} enterButton />
        </>
    );
};

export default SearchReposButton;
