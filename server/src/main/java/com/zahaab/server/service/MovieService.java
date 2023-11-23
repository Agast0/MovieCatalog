package com.zahaab.server.service;

import com.zahaab.server.model.Movie;

import java.util.List;

public interface MovieService {

    public List<Movie> getMovies();
    public Movie addMovie(Movie movie);
    public Movie deleteMovie(String name);
    public Movie updateMovie(Movie movie);
}
