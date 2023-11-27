import React, {useEffect, useState} from 'react';
import './styles.css';
import TextInput from "../TextInput";
import SimpleButton from "../SimpleButton";
import {IconButton, Skeleton} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import AddMoviePopup from "../AddMoviePopup";
import {getAllMovies} from "../../Helpers/ApiHelper";
import AdminPanelMovie from "../AdminPanelMovie";

const AdminPanelMoviesContent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddMoviePopupOpen, setIsAddMoviePopupOpen] = useState(false);
    const [isEditMoviePopupOpen, setIsEditMoviePopupOpen] = useState(false);
    const [movies, setMovies] = useState([])
    const [editMovie, setEditMovie] = useState({
        name: '', base64Image: '', description: '', genre: '', rating: 5.0
    })
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getMovies()
    }, [])

    useEffect(() => {
        console.log(movies)
    }, [movies])

    const handleEditPress = (movie: any) => {
        setEditMovie(movie)
        setIsEditMoviePopupOpen(true)
    }

    const getMovies = async (searchQuery?: string) => {
        setIsLoading(true)
        let res = await getAllMovies(undefined, undefined, searchQuery)

        if (res.status === 200) {
            setMovies(res.data)
        } else if (res.status === 400) {
            toast(res.data)
        }

        setIsLoading(false)
    }

    const handleSearch = () => {
        getMovies(searchQuery.trim())
        setSearchQuery('');
    }

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className={'movie-container'}>
            <AddMoviePopup getMovies={getMovies} isPopupOpen={isAddMoviePopupOpen} setPopupOpen={setIsAddMoviePopupOpen} />
            <AddMoviePopup getMovies={getMovies} isPopupOpen={isEditMoviePopupOpen} setPopupOpen={setIsEditMoviePopupOpen}
                           isEditing movieNameProp={editMovie.name} imageProp={editMovie.base64Image}
                           descriptionProp={editMovie.description} genreProp={editMovie.genre}
                           ratingProp={editMovie.rating}
            />
            <div className={'top-bar-container'}>
                <TextInput
                    placeholder={"Search..."}
                    isWide
                    onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
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
            <div className={'movies-container'}>
                {isLoading ? (
                    <div>
                        <Skeleton height={150} width={'100%'} />
                        <Skeleton height={150} width={'100%'} />
                    </div>
                ) : (
                    // Show movie content when not loading
                    movies.length === 0 ? (
                        <div>No movies found.</div>
                    ) : (
                        movies.map((movie: any, index: number) => (
                            <AdminPanelMovie
                                key={index}
                                name={movie.name}
                                image={movie.base64Image}
                                rating={movie.rating}
                                isOdd={index % 2 === 1}
                                getMovies={getMovies}
                                onEditPress={() => { handleEditPress(movie) }}
                            />
                        ))
                    )
                )}
            </div>
        </div>
    );
};

export default AdminPanelMoviesContent;
