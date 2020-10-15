import React from 'react';

const SearchReposInput = (props: any) => {
    const handleInputChange = (event: any) => {
        props.setInputValue(event.target.value);
    };

    return (
        <>
            <input value={props.inputValue} onChange={event => handleInputChange(event)} />
        </>
    );
};

export default SearchReposInput;
