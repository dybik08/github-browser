import React, { FC, ReactElement } from 'react';
import { configure, mount, shallow, ShallowWrapper } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import SearchReposInput from '../../components/SearchReposInput';
import * as utils from '../../utils';
import * as networkActions from '../../actions/networkActions';
import ReactRedux from 'react-redux';
//
const dispaczero = jest.fn();
const mockDispatch = jest.fn().mockImplementation(() => ({
    dispatch: dispaczero,
}));
jest.mock('react-redux', () => ({
    useSelector: jest.fn().mockReturnValue({
        repositories: {
            loading: false,
            repos: [],
        },
    }),
    useDispatch: () => mockDispatch,
}));

const mockedRepo = {
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
};

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

jest.mock('../../utils', () => ({
    formatReposResponseData: jest.fn(),
}));

configure({ adapter: new Adapter() });

describe('RepoListItem', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');

    // @ts-ignore
    useStateSpy.mockImplementation((init: any) => [init, setState]);
    let wrapper: any;

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllMocks();
    });

    beforeEach(() => {
        wrapper = mount(<SearchReposInput reposLoading={false} setRepos={jest.fn()} setReposLoading={jest.fn()} />);
    });

    it('renders correctly', () => {
        const tree = renderer.create(wrapper).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should update state on input change', () => {
        const newInputValue = 'React is Awesome';
        wrapper.find('.search-row').simulate('change', { target: { value: newInputValue } });
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
        wrapper.find('.ant-btn').simulate('click');

        expect(mockDispatch).toHaveBeenCalled();
    });
});
