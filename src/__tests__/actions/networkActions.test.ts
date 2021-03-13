import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { fetchRepos, NetworkActionNames } from '../../actions/networkActions';
import mockedRepository from '../../__mocks__/mockRepositoryData';
jest.mock('axios');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('network actions testing', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Should call START_FETCHING_REPOS & FETCHING_REPOS_DONE', () => {
        const mockedGet = jest.fn().mockResolvedValue({ data: { items: [mockedRepository, mockedRepository] } });
        axios.get = mockedGet;
        const expectedActions = [
            {
                type: NetworkActionNames.START_FETCHING_REPOS,
            },
            { type: NetworkActionNames.FETCHING_REPOS_DONE, payload: [mockedRepository, mockedRepository] },
        ];
        const store = mockStore([]);
        return store.dispatch<any>(fetchRepos('React')).then(() => {
            // return of async actions
            expect(mockedGet).toHaveBeenCalled();

            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('Should call START_FETCHING_REPOS & FETCHING_REPOS_ERROR', () => {
        const mockedGet = jest.fn().mockRejectedValue('Error');
        axios.get = mockedGet;
        const expectedActions = [
            {
                type: NetworkActionNames.START_FETCHING_REPOS,
            },
            { type: NetworkActionNames.FETCHING_REPOS_ERROR, payload: 'Error' },
        ];
        const store = mockStore([]);
        return store.dispatch<any>(fetchRepos('React')).then(() => {
            // return of async actions
            expect(mockedGet).toHaveBeenCalled();

            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
