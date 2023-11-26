import {post, del, patch, get} from "./AxiosHelper"

const SERVER_URL = 'http://localhost:8080';
const ADMIN_URL = '/admin';
const MOVIES_URL = '/movies';
const AUTH_URL = '/auth';

const CREATE_ADMIN_USER_URL = `${SERVER_URL}${ADMIN_URL}/create-admin-user`;
const GET_ALL_ADMIN_USERS_URL = `${SERVER_URL}${ADMIN_URL}/all-admin-users`;
const DELETE_ADMIN_USER_URL = `${SERVER_URL}${ADMIN_URL}/delete-admin-user`;
const GET_USERNAME_FROM_TOKEN_URL = `${SERVER_URL}${ADMIN_URL}/verify-token`;

const CREATE_MOVIE_URL = `${SERVER_URL}${ADMIN_URL}/create-movie`;
const UPDATE_MOVIE_URL = `${SERVER_URL}${ADMIN_URL}/update-movie`;
const DELETE_MOVIE_URL = `${SERVER_URL}${ADMIN_URL}/delete-movie`;
const GET_ALL_MOVIES_URL = `${SERVER_URL}${MOVIES_URL}/all`;
const GET_MOVIE_URL = `${SERVER_URL}${MOVIES_URL}`;

const LOGIN_URL = `${SERVER_URL}${AUTH_URL}/login`

export const handleCreateUser = async (username: string, password: string) => {
    return post(CREATE_ADMIN_USER_URL, {username, password})
}

export const handleGetAllUsers = async () => {
    return get(GET_ALL_ADMIN_USERS_URL);
}

export const handleDeleteUser = async (username: string) => {
    return del(DELETE_ADMIN_USER_URL, {username});
}

export const handleGetUsernameFromToken = async () => {
    return get(GET_USERNAME_FROM_TOKEN_URL);
}

export const handleCreateMovie = async (name: string, base64Image: string, description: string, genre: string, rating: number) => {
    return post(CREATE_MOVIE_URL, {name, base64Image, description, genre, rating})
}

export const handleUpdateMovie = async (name: string, base64Image: string, description: string, genre: string, rating: number) => {
    return patch(UPDATE_MOVIE_URL, {name, base64Image, description, genre, rating})
}

export const deleteMovie = async (movieName: string) => {
    return del(DELETE_MOVIE_URL, {movieName})
}

export const getAllMovies = async (sort?: string, genre?: string, search?: string) => {
    return get(GET_ALL_MOVIES_URL, {sort, genre, search})
}

export const getMovie = async (movieName: string) => {
    return get(GET_MOVIE_URL, {movieName})
}

export const login = async (username: string, password: string) => {
    return post(LOGIN_URL, {username, password})
}