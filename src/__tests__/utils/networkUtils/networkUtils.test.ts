import { repositoriesResponseHandler } from '../../../utils/networkUtils';
import mockedRepository from '../../../__mocks__/mockRepositoryData';

describe('Network utils tests', () => {
    it('Should call repositoriesResponseHandler and return formatted data', () => {
        expect(
            repositoriesResponseHandler([
                {
                    ...mockedRepository,
                    archive_url: 'archive_url',
                    assignees_url: 'assignees_url',
                    blobs_url: 'blobs_url',
                    branches_url: 'branches_url',
                    clone_url: 'clone_url',
                    collaborators_url: 'collaborators_url',
                    comments_url: 'comments_url',
                    commits_url: 'commits_url',
                    compare_url: 'compare_url',
                    contents_url: 'contents_url',
                    contributors_url: 'contributors_url',
                    default_branch: 'default_branch',
                },
                {
                    ...mockedRepository,
                    archive_url: 'archive_url',
                    assignees_url: 'assignees_url',
                    blobs_url: 'blobs_url',
                    branches_url: 'branches_url',
                    clone_url: 'clone_url',
                    collaborators_url: 'collaborators_url',
                    comments_url: 'comments_url',
                    commits_url: 'commits_url',
                    compare_url: 'compare_url',
                    contents_url: 'contents_url',
                    contributors_url: 'contributors_url',
                    default_branch: 'default_branch',
                },
                {
                    ...mockedRepository,
                    archive_url: 'archive_url',
                    assignees_url: 'assignees_url',
                    blobs_url: 'blobs_url',
                    branches_url: 'branches_url',
                    clone_url: 'clone_url',
                    collaborators_url: 'collaborators_url',
                    comments_url: 'comments_url',
                    commits_url: 'commits_url',
                    compare_url: 'compare_url',
                    contents_url: 'contents_url',
                    contributors_url: 'contributors_url',
                    default_branch: 'default_branch',
                },
            ])
        ).toStrictEqual([
            {
                ...mockedRepository,
                login: 'login',
                key: '0',
                created_at: 'Wed Jan 01 2020 10:12:00 GMT+0100 (GMT+01:00)',
                updated_at: 'Wed Jan 01 2020 10:14:00 GMT+0100 (GMT+01:00)',
            },
            {
                ...mockedRepository,
                login: 'login',
                key: '1',
                created_at: 'Wed Jan 01 2020 10:12:00 GMT+0100 (GMT+01:00)',
                updated_at: 'Wed Jan 01 2020 10:14:00 GMT+0100 (GMT+01:00)',
            },
            {
                ...mockedRepository,
                login: 'login',
                key: '2',
                created_at: 'Wed Jan 01 2020 10:12:00 GMT+0100 (GMT+01:00)',
                updated_at: 'Wed Jan 01 2020 10:14:00 GMT+0100 (GMT+01:00)',
            },
        ]);
    });
});
