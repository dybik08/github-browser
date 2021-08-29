import { IRepositoryApi, IRepositoryDto } from './RepositoryApi.interface';
import { HttpClient } from '../HttpClient';

export class RepositoryApi implements IRepositoryApi {
    private readonly baseUrl = 'search/repositories';

    constructor(private readonly httpClient: HttpClient) {}

    getRepositories(
        query: string
    ): Promise<{
        items: IRepositoryDto[];
    }> {
        return this.httpClient.get<{
            items: IRepositoryDto[];
        }>(`${this.baseUrl}?q=${query}`);
    }
}
