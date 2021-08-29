import React from 'react';
import { configure, shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import { RepoInfoRow } from '../../../components/RepoDetailsModal/RepoInfoRow';
import mockRepositoryData from '../../../__mocks__/mockRepositoryData';

configure({ adapter: new Adapter() });

describe('RepoInfoRow', () => {
    const wrapper: any = shallow(<RepoInfoRow repository_data={mockRepositoryData} />);

    it('renders correctly', () => {
        const tree = renderer.create(wrapper).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('render correct language', () => {
        const language = wrapper.find({ id: 'language' }).text();
        expect(language).toBe('javascript');
    });

    it('render correct stargazersCount', () => {
        const stargazersCount = wrapper.find({ id: 'stargazersCount' }).text();
        expect(stargazersCount).toBe('1');
    });

    it('render correct forks', () => {
        const forks = wrapper.find({ id: 'forks' }).text();
        expect(forks).toBe('2');
    });
});
