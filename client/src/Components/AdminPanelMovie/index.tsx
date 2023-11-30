import React from 'react';
import './styles.css';
import {IconButton, Rating} from "@mui/material";
import {MdOutlineEdit} from "react-icons/md";
import {RiDeleteBin5Fill} from "react-icons/ri";
import toast from "react-hot-toast";
import {deleteMovie} from "../../Helpers/ApiHelper";
import {useNavigate} from "react-router-dom";

const AdminPanelMovie = ({getMovies, onEditPress, name, image, rating, isOdd, ...rest}: any) => {
    const navigate = useNavigate();

    const handleDeletePress = async () => {
        const loadingToast = toast.loading('Deleting Movie...');
        let res = await deleteMovie(name);

        toast.remove(loadingToast);
        if (res.status === 200 && res.data) {
            toast.success(res.data.message)
            getMovies()
        } else if (res.status === 403) {
            toast.error("Please log in!")
            navigate('/admin-login')
        } else if (res.status === 400) {
            Object.keys(res.data).forEach((key) => {
                toast.error(res.data[key]);
            });
        } else {
            console.log(`An error occurred: ${res}`)
        }
    }

    return (
        <div className={`post-container ${isOdd ? 'odd' : ''}`}>
            <div className={'image-name'}>
                <img
                    className={'image'}
                    src={image}
                    alt="Movie poster"
                />
                <div className={'name'}>
                    {name}
                </div>
            </div>
            <div className={'icon-buttons'}>
                <Rating value={rating} precision={0.1} size={'large'} readOnly />
                <IconButton className={'icon-button'} onClick={onEditPress}>
                    <MdOutlineEdit className={'icon'} size={24} />
                </IconButton>
                <IconButton className={'icon-button'} onClick={handleDeletePress}>
                    <RiDeleteBin5Fill className={'icon'} size={24} />
                </IconButton>
            </div>
        </div>
    );
};

export default AdminPanelMovie;
