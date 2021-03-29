import { repositories, repositoriesReducerInitialState } from '../../reducers/repositoriesReducer';
import { NetworkActionNames } from '../../actions/networkActions';
import mockedRepository from '../../__mocks__/mockRepositoryData';

describe('repositories reducer tests', () => {
    it('should return initial state', () => {
        expect(repositories(undefined, {})).toEqual(repositoriesReducerInitialState);
    });

    it('should handle START_FETCHING_REPOS action', () => {
        expect(
            repositories(repositoriesReducerInitialState, {
                type: NetworkActionNames.START_FETCHING_REPOS,
                payload: undefined,
            })
        ).toEqual({
            ...repositoriesReducerInitialState,
            loading: true,
        });
    });

    it('should handle FETCHING_REPOS_ERROR action', () => {
        expect(
            repositories(repositoriesReducerInitialState, {
                type: NetworkActionNames.FETCHING_REPOS_ERROR,
                payload: undefined,
            })
        ).toEqual({
            ...repositoriesReducerInitialState,
            loading: false,
        });
    });

    it('should handle FETCHING_REPOS_DONE action', () => {
        expect(
            repositories(repositoriesReducerInitialState, {
                type: NetworkActionNames.FETCHING_REPOS_DONE,
                payload: [mockedRepository],
            })
        ).toStrictEqual({
            ...repositoriesReducerInitialState,
            repos: [{ ...mockedRepository, key: '0', login: mockedRepository.owner.login }],
        });
    });
});
