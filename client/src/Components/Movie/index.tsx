import React, {useState} from 'react';
import './styles.css'
import MoviePopup from "../MoviePopup";

const Movie = ({movie}: any) => {
    const [isPopupOpen, setPopupOpen] = useState(false);

    return (
        <>
            <MoviePopup movie={movie} isOpen={isPopupOpen} setOpen={setPopupOpen}/>
            <div className={'movie-container-main'} onClick={() => {
                setPopupOpen(true)
            }}>
                <div className={'image-container'}>
                    <img
                        className={'image'}
                        src={movie.base64Image}
                        alt="Movie poster"
                    />
                </div>
                <div className={'movie-title'}>
                    {movie.name}
                </div>
            </div>
        </>
    );
};

export default Movie;
