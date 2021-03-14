import React from 'react';
import { configure, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import SearchReposInput from '../../components/SearchReposInput';
import * as networkActions from '../../actions/networkActions';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    useSelector: jest.fn().mockReturnValue({
        repositories: {
            loading: false,
            repos: [],
        },
    }),
    useDispatch: () => mockDispatch,
}));

jest.mock('../../actions/networkActions', () => ({
    fetchRepos: jest.fn().mockResolvedValue({
        data: {
            name: 'name',
            description: 'some description',
            language: 'javascript',
            stargazers_count: 1,
            forks: 2,
            owner: {
                repos_url: '',
                type: '',
                avatar_url: '',
                login: '',
            },
            created_at: '2020:10:12',
            updated_at: '2020:10:14',
            license: {
                name: 'MIT',
            },
        },
    }),
}));

jest.mock('../../utils/networkUtils', () => ({
    repositoriesResponseHandler: jest.fn(),
}));

configure({ adapter: new Adapter() });

describe('RepoListItem', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');

    // @ts-ignore
    useStateSpy.mockImplementation((init: any) => [init, setState]);
    let wrapper: any;

    beforeEach(() => {
        wrapper = mount(<SearchReposInput reposLoading={false} setRepos={jest.fn()} setReposLoading={jest.fn()} />);
    });

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const tree = renderer.create(wrapper).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should update state on input change', () => {
        const newInputValue = 'React is Awesome';
        wrapper.find('.ant-input').simulate('change', { target: { value: newInputValue } });
        expect(setState).toHaveBeenCalledWith(newInputValue);
    });

    it('should call onSearchReposButtonPress correctly', () => {
        const setReposLoadingMock = jest.fn();
        const setReposMock = jest.fn();
        // @ts-ignore
        useStateSpy.mockImplementation(init => ['repository', setState]);
        wrapper = mount(
            <SearchReposInput reposLoading={false} setRepos={setReposMock} setReposLoading={setReposLoadingMock} />
        );
        wrapper.find('.ant-input').simulate('change', { target: { value: 'React' } });

        wrapper.find('.ant-btn').simulate('click');
        expect(setState).toHaveBeenCalledWith('React');
        expect(networkActions.fetchRepos).toHaveBeenCalled();
    });
});
