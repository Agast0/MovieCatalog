import React, {useEffect, useRef, useState} from 'react';
import './styles.css';
import Drawer from '@mui/joy/Drawer';
import Sheet from '@mui/joy/Sheet';
import {Rating} from "@mui/material";

const MoviePopup = ({movie, isOpen, setOpen}: any) => {
    return (
        <Drawer
            size="lg"
            variant="plain"
            open={isOpen}
            onClose={() => setOpen(false)}
            slotProps={{
                content: {
                    sx: {
                        bgcolor: 'transparent',
                        p: { md: 4, sm: 0 },
                        boxShadow: 'none',
                        mx: '20%',
                    },
                },
            }}
        >
            <Sheet
                sx={{
                    borderRadius: 'md',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    height: '100%',
                    overflow: 'auto',
                    bgcolor: '#293236',
                }}
            >
                <div className={'popup-content-movie'}>
                    <div className={'popup-movie-name'}>
                        {movie.name}
                    </div>
                    <div className={'popup-middle-container'}>
                        <img
                            className={'popup-image'}
                            src={movie.base64Image}
                            alt="Movie poster"
                        />
                        <div className={'popup-content-container'}>
                            <div className={'popup-content-top-container'}>
                                <div className={'popup-genre'}>
                                    {movie.genre}
                                </div>
                                <Rating
                                    name="movie-rating"
                                    value={movie.rating}
                                    precision={0.1}
                                    size={'large'}
                                    readOnly
                                />
                            </div>
                            <div className={'popup-description'}>
                                {movie.description}
                            </div>
                        </div>
                    </div>
                </div>
            </Sheet>
        </Drawer>
    );
};

export default MoviePopup;
