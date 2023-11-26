import React, {useEffect, useRef, useState} from 'react';
import './styles.css';
import Drawer from '@mui/joy/Drawer';
import Sheet from '@mui/joy/Sheet';
import SimpleButton from '../SimpleButton';
import TextInput from '../TextInput';
import { Rating } from '@mui/material';
import toast from "react-hot-toast";
import {handleCreateMovie} from "../../Helpers/ApiHelper";
import {useNavigate} from "react-router-dom";

const AddMoviePopup = ({ isPopupOpen, setPopupOpen, isEditing, movieNameProp, imageProp, descriptionProp, genreProp, ratingProp, ...rest }: any) => {
    const [movieName, setMovieName] = useState('');
    const [movieDesc, setMovieDesc] = useState('');
    const [rating, setRating] = useState(4.9);
    const [genre, setGenre] = useState('');
    const [imageBase64, setImageBase64] = useState<string>('');
    const formRef = useRef<HTMLFormElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (movieNameProp) setMovieName(movieNameProp)
        if (imageProp) setImageBase64(imageProp)
        if (descriptionProp) setMovieDesc(descriptionProp)
        if (genreProp) setGenre(genreProp)
        if (ratingProp) setRating(ratingProp)
    }, [movieNameProp, imageProp, descriptionProp, genreProp, ratingProp])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImageBase64(base64String);
            };
            reader.readAsDataURL(file);
        } else {
            setImageBase64('');
            if (formRef && formRef.current) formRef.current.reset();
        }
    };

    const handleGenreChange = (e: { target: { value: React.SetStateAction<string> } }) => {
        setGenre(e.target.value);
    };

    const handleAddMovie = async () => {
        if (!imageBase64) {
            toast.error('Please upload an image!')
            return
        }

        if (!genre) {
            toast.error('Please select a genre!')
            return
        }

        const loadingToast = toast.loading('Adding Movie...');
        let res = await handleCreateMovie(movieName, imageBase64, movieDesc, genre, rating)

        toast.remove(loadingToast);
        if (res.status === 200) {
            toast.success("Movie created successfully!")
            setMovieName('')
            setMovieDesc('')
            setGenre('')
            setRating(5.0)
            setImageBase64('')
            if (formRef && formRef.current) formRef.current.reset();
            setPopupOpen(false)
        } else if (res.status === 403) {
            toast.error("Please log in!")
            navigate('/admin-login')
        } else if (res.status === 400) {
            if (typeof res.data === 'object') {
                Object.keys(res.data).forEach((key) => {
                    toast.error(res.data[key]);
                });
            } else if (typeof res.data === 'string') {
                toast.error(res.data);
            }
        } else {
            toast.error("An error occurred! Please try again.")
        }
    };

    return (
        <Drawer
            size="lg"
            variant="plain"
            open={isPopupOpen}
            onClose={() => setPopupOpen(false)}
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
                <div className={'popup-content'}>
                    <div className={'title'}>{isEditing ? 'Edit Movie' : 'Add A Movie'}</div>
                    <div className={'form-container'}>
                        <div className={'image-outer-container'}>
                            <div className={'image-inner-container'}>
                                {imageBase64 ? (
                                    <img
                                        className={'image'}
                                        src={imageBase64}
                                        alt="Movie poster"
                                    />
                                ) : (
                                    <div className={'upload-image-text'}>Please upload an image</div>
                                )}
                            </div>
                            <form ref={formRef}>
                                <input
                                    className={'file-input'}
                                    type="file"
                                    accept="image/*"
                                    id="imageUpload"
                                    onChange={handleImageChange}
                                />
                            </form>
                        </div>
                        <div className={'form-content'}>
                            Enter Movie Name:
                            <TextInput
                                placeholder={'Movie Name'}
                                isWide
                                value={movieName}
                                onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                                    setMovieName(e.target.value)
                                }
                                style={{ marginTop: '5px', marginBottom: '15px' }}
                            />

                            Enter Movie Description:
                            <TextInput
                                placeholder={'Movie Description'}
                                isTall
                                isWide
                                value={movieDesc}
                                style={{ marginTop: '5px', marginBottom: '15px' }}
                                onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                                    setMovieDesc(e.target.value)
                                }
                            />
                            <div className={'rating-genre'}>
                                <div className={'rating'}>
                                    Rating:
                                    <Rating
                                        name="movie-rating"
                                        value={rating}
                                        precision={0.1}
                                        size={'large'}
                                        sx={{ width: '150px', marginTop: '5px' }}
                                        onChange={(event: any, newValue: any) => {
                                            setRating(newValue);
                                        }}
                                    />
                                </div>
                                <div className={'genre'}>
                                    Genre:
                                    <div className="genre-dropdown-container">
                                        <select id="genreDropdown" value={genre} onChange={handleGenreChange}>
                                            <option value="">Select Genre</option>
                                            <option value="Action">Action</option>
                                            <option value="Drama">Drama</option>
                                            <option value="Comedy">Comedy</option>
                                            <option value="Sci-Fi">Sci-Fi</option>
                                            <option value="Thriller">Thriller</option>
                                            <option value="Romance">Romance</option>
                                            <option value="Horror">Horror</option>
                                            <option value="Fantasy">Fantasy</option>
                                            <option value="Mystery">Mystery</option>
                                            <option value="Documentary">Documentary</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'enter-button'}>
                        <SimpleButton label={'Add Movie'} isWide isBold onClick={handleAddMovie} />
                    </div>
                </div>
            </Sheet>
        </Drawer>
    );
};

export default AddMoviePopup;
