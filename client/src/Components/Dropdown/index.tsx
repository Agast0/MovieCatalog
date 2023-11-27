import React from 'react';
import './styles.css'

const Dropdown = ({label, isSort, isGenre, ...rest}: any) => {

    const genreOptions = [
        {label: 'Select Genre', value: ''},
        {label: 'Action', value: 'Action'},
        {label: 'Drama', value: 'Drama'},
        {label: 'Comedy', value: 'Comedy'},
        {label: 'Sci-Fi', value: 'Sci-Fi'},
        {label: 'Thriller', value: 'Thriller'},
        {label: 'Romance', value: 'Romance'},
        {label: 'Horror', value: 'Horror'},
        {label: 'Fantasy', value: 'Fantasy'},
        {label: 'Mystery', value: 'Mystery'},
        {label: 'Documentary', value: 'Documentary'},
    ];

    const sortOptions = [
        {label: 'Sort by', value: ''},
        {label: 'A-Z', value: 'alphabet-asc'},
        {label: 'Z-A', value: 'alphabet-desc'},
        {label: 'Highest Rating', value: 'rating-desc'},
        {label: 'Lowest Rating', value: 'rating-asc'},
    ];

    return (
        <div className="dropdown-container">
            <label htmlFor="genre">
                {label}
            </label>
            <select id="genre" className={'dropdown'} {...rest} >
                {isGenre && genreOptions.map((option: any) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
                {isSort && sortOptions.map((option: any) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
