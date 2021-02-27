import React, { FC, ReactElement } from 'react';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { RepoListItem } from '../../components/RepoList/RepoListItem';
import mockRepositoryData from '../../__mocks__/mockRepositoryData';

configure({ adapter: new Adapter() });

describe('RepoListItem', () => {
    let wrapper: any = shallow(
        <RepoListItem listItemKey={mockRepositoryData.name + 1} repository={mockRepositoryData} />
    );

    it('renders correctly', () => {
        const tree = renderer.create(wrapper).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should display repo language correctly', () => {
        const languageName = wrapper.findWhere((node: any) => node.text() === mockRepositoryData.language);
        expect(languageName).toBeTruthy();
    });

    it('should display stargazers_count correctly', () => {
        const stargazers_count = wrapper.findWhere((node: any) => node.text() === mockRepositoryData.stargazers_count);
        expect(stargazers_count).toBeTruthy();
    });

    it('should display forks correctly', () => {
        const forks = wrapper.findWhere((node: any) => node.text() === mockRepositoryData.forks);
        expect(forks).toBeTruthy();
    });
});
