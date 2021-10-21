import { IRepositoryDto } from './RepositoryApi.interface';
import { RepositoryOwner } from 'constants/types';

export class RepositoryDtoBuilder {
    private constructor(private readonly dto: Partial<IRepositoryDto> = {}) {}

    static empty(): RepositoryDtoBuilder {
        return new RepositoryDtoBuilder();
    }

    static prefilled(): RepositoryDtoBuilder {
        return new RepositoryDtoBuilder()
            .withId(1)
            .withName('repository name')
            .withDescription('repository description')
            .withLanguage('javascript')
            .withStargazersCount(1)
            .withForks(2)
            .withOwner({
                repos_url: 'repos_url',
                type: 'type',
                avatar_url: 'avatar_url',
                login: 'login',
            })
            .withCreatedAt('2020:10:12')
            .withUpdatedAt('2020:10:14')
            .withLicense('MIT');
    }

    build(): IRepositoryDto {
        return this.dto as IRepositoryDto;
    }

    withId(id: number): RepositoryDtoBuilder {
        this.dto.id = id;
        return this;
    }

    withName(name: string): RepositoryDtoBuilder {
        this.dto.name = name;
        return this;
    }

    withDescription(description: string): RepositoryDtoBuilder {
        this.dto.description = description;
        return this;
    }

    withLanguage(language: string): RepositoryDtoBuilder {
        this.dto.language = language;
        return this;
    }

    withStargazersCount(stargazersCount: number): RepositoryDtoBuilder {
        this.dto.stargazersCount = stargazersCount;
        return this;
    }

    withForks(forks: number): RepositoryDtoBuilder {
        this.dto.forks = forks;
        return this;
    }

    withOwner(owner: RepositoryOwner): RepositoryDtoBuilder {
        this.dto.owner = owner;
        return this;
    }

    withCreatedAt(createdAt: string): RepositoryDtoBuilder {
        this.dto.createdAt = createdAt;
        return this;
    }

    withUpdatedAt(updatedAt: string): RepositoryDtoBuilder {
        this.dto.updatedAt = updatedAt;
        return this;
    }

    withLicense(license: string): RepositoryDtoBuilder {
        this.dto.license = license;
        return this;
    }
}
