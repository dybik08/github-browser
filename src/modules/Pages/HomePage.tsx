import { FavouritesContainer, ReposDataTable, SearchReposInput, RepoDetailsModal } from 'components';
import React from 'react';
import { useRepository } from '../Repository';

export const HomePage = () => {
    const { handleOk, handleCancel, selectedRepository, setSelectedRepository } = useRepository();

    return (
        <>
            <header className='App-header'>Github Browser</header>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ margin: '10px 20px', flex: 4 }}>
                    <SearchReposInput />
                    {selectedRepository && (
                        <RepoDetailsModal
                            repository_data={selectedRepository}
                            handleOk={handleOk}
                            handleCancel={handleCancel}
                        />
                    )}
                    <ReposDataTable setSelectedRepository={setSelectedRepository} />
                </div>
                <FavouritesContainer />
            </div>
        </>
    );
};
