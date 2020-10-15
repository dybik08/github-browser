import React from 'react';

const SearchReposResults = (props: any) => {
    if (!props.repos) {
        return null;
    }

    const renderReposList = props.repos.items.map((repo: any) => {
        return (
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <p style={{ flex: 1 }}>{repo.owner.login}</p>
                <p style={{ flex: 1 }}>{repo.language}</p>
                <p style={{ flex: 1 }}>{repo.stargazers_count}</p>
                <p style={{ flex: 1 }}>{repo.name}</p>
            </div>
        );
    });

    return <>{renderReposList}</>;
};

export default SearchReposResults;
