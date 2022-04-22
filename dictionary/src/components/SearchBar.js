import React from 'react';
import { useState } from 'react';

const SearchBar = (props) => {
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setSearchTerm(searchValue);
        setSearchValue('')
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                value={searchValue}
                placeholder='Enter your search here ...'
                onChange={handleChange}/>
            <button>GO</button>
        </form>    
    )
}

export default SearchBar;