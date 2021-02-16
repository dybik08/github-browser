import React, { FC, ReactElement } from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import SearchReposInput from '../../Components/SearchReposInput';

configure({ adapter: new Adapter() });

describe('RepoListItem', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation((init: any) => [init, setState]);
    let wrapper: ShallowWrapper = shallow(
        <SearchReposInput reposLoading={false} setRepos={jest.fn()} setReposLoading={jest.fn()} />
    );

    it('renders correctly', () => {
        const tree = renderer.create(wrapper).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should update state on input change', () => {
        const newInputValue = 'React is Awesome';
        wrapper.find('.search-row').simulate('change', { target: { value: newInputValue } });
        expect(setState).toHaveBeenCalledWith(newInputValue);
    });
});
