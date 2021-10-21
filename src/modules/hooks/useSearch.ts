import React from 'react';

export const useSearch = () => {
    const [inputValue, setInputValue] = React.useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    return { inputValue, handleInputChange };
};
