import { useState } from 'react';
import { IRepositoryDto } from '../API';

export const useRepository = () => {
    const [selectedRepository, setSelectedRepository] = useState<IRepositoryDto | null>(null);

    const handleOk = () => {
        setSelectedRepository(null);
    };

    const handleCancel = () => {
        setSelectedRepository(null);
    };

    return {
        selectedRepository,
        handleCancel,
        handleOk,
        setSelectedRepository,
    };
};
