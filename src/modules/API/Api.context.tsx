import { IRepositoryApi } from './Repository/RepositoryApi.interface';
import { RepositoryApi } from './Repository/RepositoryApi';
import { HttpClient } from './HttpClient';
import React, { createContext, useContext } from 'react';

interface IApiContext {
    repositoryApi: IRepositoryApi;
}

const httpClient = new HttpClient();

const defaultApiContext: IApiContext = {
    repositoryApi: new RepositoryApi(httpClient),
};

const ApiContext = createContext<IApiContext>(defaultApiContext);

export const ApiProvider: React.FC = ({ children }) => {
    return <ApiContext.Provider value={defaultApiContext}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);
