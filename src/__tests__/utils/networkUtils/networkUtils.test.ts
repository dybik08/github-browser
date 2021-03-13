import { repositoriesResponseHandler } from '../../../utils/networkUtils';
import mockedRepository from '../../../__mocks__/mockRepositoryData';

describe('Network utils tests', () => {
    it('Should call repositoriesResponseHandler and return formatted data', () => {
        expect(repositoriesResponseHandler([mockedRepository, mockedRepository, mockedRepository]));
    });
});
