import React, {useEffect, useState} from 'react';
import './styles.css'
import TextInput from "../../Components/TextInput";
import {IconButton, Skeleton} from "@mui/material";
import {FaFilter, FaSearch, FaSort} from "react-icons/fa";
import Dropdown from "../../Components/Dropdown";
import {getAllMovies} from "../../Helpers/ApiHelper";
import toast from "react-hot-toast";
import Movie from "../../Components/Movie";
import SimpleButton from "../../Components/SimpleButton";

const Movies = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [genre, setGenre] = useState('');
    const [sortFilter, setSortFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        handleGetMovies()
    }, [])

    const handleSortFilterChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setSortFilter(e.target.value);
    };

    const handleGenreChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setGenre(e.target.value);
    };

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter') {
            handleGetMovies();
        }
    }

    const handleGetMovies = async () => {
        setIsLoading(true)

        let sortSelection = sortFilter ? sortFilter : undefined;
        let genreSelection = genre ? genre : undefined;
        let search = searchQuery ? searchQuery : undefined;

        let res = await getAllMovies(sortSelection, genreSelection, search)

        if (res.status === 200) {
            setMovies(res.data)
            console.log(res.data)
        } else if (res.status === 400) {
            toast(res.data)
        }

        setIsLoading(false)
    }

    return (
        <div className={'main-container'}>
            <div className={'movies-panel-container'}>
                <div className={'searchbar-filters-container'}>
                    <div className={'searchbar-container'}>
                        <TextInput
                            placeholder={"Search..."}
                            isWide
                            onChange={(e: {
                                target: { value: React.SetStateAction<string>; };
                            }) => setSearchQuery(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <IconButton onClick={handleGetMovies} className={'search-icon-button'}>
                            <FaSearch className={'search-icon'} size={15}/>
                        </IconButton>
                    </div>
                    <div className={'filters'}>
                        <Dropdown label={<FaSort className={'filter-icon'}/>} isSort value={sortFilter}
                                  onChange={handleSortFilterChange}/>
                        <Dropdown label={<FaFilter className={'filter-icon'}/>} isGenre value={genre}
                                  onChange={handleGenreChange}/>
                        <SimpleButton onClick={() => handleGetMovies()} label={'Apply Filters'} style={{marginLeft: '30px'}}/>
                    </div>
                </div>
                <div className={'movies-container-main'}>
                    {isLoading ? (
                        <div className={'skeleton-container'}>
                            <Skeleton height={200} width={150}/>
                            <Skeleton height={200} width={150}/>
                            <Skeleton height={200} width={150}/>
                            <Skeleton height={200} width={150}/>
                        </div>
                    ) : (
                        movies.length === 0 ? (
                            <div>No movies found.</div>
                        ) : (
                            movies.map((movie: any, index: number) => (
                                <Movie movie={movie} />
                            ))
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default Movies