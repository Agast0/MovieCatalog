import React, { useState } from 'react';
import './styles.css';
import TextInput from "../TextInput";
import SimpleButton from "../SimpleButton";
import { IconButton } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import AddMoviePopup from "../AddMoviePopup/AddMoviePopup";

const AdminPanelMoviesContent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddMoviePopupOpen, setIsAddMoviePopupOpen] = useState(false);

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            toast.error('Enter a valid search query.');
            return;
        }

        setSearchQuery('');
    }

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className={'movie-container'}>
            <AddMoviePopup isPopupOpen={isAddMoviePopupOpen} setPopupOpen={setIsAddMoviePopupOpen} />
            <div className={'top-bar-container'}>
                <TextInput
                    placeholder={"Search..."}
                    isWide
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    value={searchQuery}
                />
                <IconButton onClick={handleSearch} className={'search-icon-button'}>
                    <FaSearch className={'search-icon'} size={15} />
                </IconButton>
                <SimpleButton
                    label={"Add A New Movie"}
                    width={200}
                    isWide
                    isBold
                    style={{ marginLeft: '80px' }}
                    onClick={() => {setIsAddMoviePopupOpen(true)}}
                />
            </div>
        </div>
    );
};

export default AdminPanelMoviesContent;
