import { NetworkActionNames } from 'actions/networkActions';
import { IBackendRepositoryDto, IRepositoryDto } from 'modules/API';
import { RepositoryDtoBuilder } from 'modules/API';

export const repositoriesReducerInitialState = {
    repos: [],
    loading: false,
};

export interface RepositoriesState {
    repos: IRepositoryDto[];
    loading: boolean;
}

export const repositories = (
    state: RepositoriesState = repositoriesReducerInitialState,
    action: { type: string; payload: any }
): RepositoriesState => {
    switch (action.type) {
        case NetworkActionNames.FETCH_REPOS:
            return state;
        case NetworkActionNames.FETCH_REPOS_ADDITIONAL_USER_REPOS:
            return state;
        case NetworkActionNames.START_FETCHING_REPOS:
            return {
                ...state,
                loading: true,
            };
        case NetworkActionNames.FETCHING_REPOS_ERROR:
            return {
                ...state,
                loading: false,
            };
        case NetworkActionNames.FETCHING_REPOS_DONE:
            return {
                ...state,
                repos: action.payload.map((repo: IBackendRepositoryDto) => {
                    return RepositoryDtoBuilder.empty()
                        .withId(repo.id)
                        .withLicense(repo.license)
                        .withCreatedAt(repo.created_at)
                        .withName(repo.name)
                        .withStargazersCount(repo.stargazers_count)
                        .withLanguage(repo.language)
                        .withOwner(repo.owner)
                        .withForks(repo.forks)
                        .withDescription(repo.description)
                        .withUpdatedAt(repo.updated_at)
                        .build();
                }),
                loading: false,
            };
        default:
            return state;
    }
};
