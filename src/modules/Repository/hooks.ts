import { useState } from 'react';
import { IRepositoryDto, useApi } from '../API';
import { useDispatch } from 'react-redux';
import { NetworkActionNames } from 'actions/networkActions';

export const useRepository = () => {
    const [selectedRepository, setSelectedRepository] = useState<IRepositoryDto | null>(null);

    const handleOk = () => {
        setSelectedRepository(null);
    };

    const handleCancel = () => {
        setSelectedRepository(null);
    };

    return {
        selectedRepository,
        handleCancel,
        handleOk,
        setSelectedRepository,
    };
};

export const useFetchRepository = (inputValue: string) => {
    const { repositoryApi } = useApi();
    const dispatch = useDispatch();

    const fetchRepositories = () => {
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

    return {
        fetchRepositories: fetchRepositories,
    };
};
