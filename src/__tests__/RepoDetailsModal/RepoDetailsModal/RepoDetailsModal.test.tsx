import React from 'react';
import { configure, mount, ReactWrapper, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { RepoDetailsModal } from '../../../components/RepoDetailsModal/RepoDetailsModal';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as networkActions from '../../../actions/networkActions';
import { RepositoryDtoBuilder } from '../../../modules/API';
const mockStore = configureStore();

configure({ adapter: new Adapter() });

const mockFetchAdditionalUserReposResponse = ['repo1', 'repo2', 'repo3'];
const mockFetchAdditionalUserRepos = jest.fn().mockResolvedValue(mockFetchAdditionalUserReposResponse);
networkActions.fetchAdditionalUserRepos = mockFetchAdditionalUserRepos;

const mock_repository_data = {
    name: 'name',
    description: 'some description',
    language: 'javascript',
    stargazersCount: 1,
    forks: 2,
    owner: {
        repos_url: 'repos_url',
        type: '',
        avatar_url: '',
        login: '',
    },
    created_at: '2020:10:12',
    updated_at: '2020:10:14',
    license: {
        name: 'MIT',
    },
    id: 20,
};

const initialState: any = {
    repositories: {
        repos: [],
        loading: false,
    },
    favourites: [],
};

describe('RepoDetailsModal', () => {
    let wrapper: ReactWrapper;

    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(init => [init, setState]);

    beforeEach(() => {
        wrapper = mount(
            <Provider store={mockStore(initialState)}>
                {' '}
                <RepoDetailsModal
                    repository_data={RepositoryDtoBuilder.prefilled().build()}
                    handleCancel={jest.fn()}
                    handleOk={jest.fn()}
                />
            </Provider>
        );
    });

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllMocks();
    });

    it('render correct repo-description', () => {
        const repo_description = wrapper.find({ id: 'repo-description' }).text();
        expect(repo_description).toBe(mock_repository_data.description);
    });

    it('fetch additional user repos on mount', () => {
        expect(mockFetchAdditionalUserRepos).toHaveBeenCalledWith('repos_url');
        expect(setState).toHaveBeenCalledWith(mockFetchAdditionalUserReposResponse);
    });
});
