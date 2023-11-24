package com.zahaab.server.dto;

import jakarta.validation.constraints.NotNull;

import java.util.Arrays;
import java.util.List;

public class CreateMoviesDto {
    @NotNull
    private List<CreateMovieDto> movies;

    public CreateMoviesDto(List<CreateMovieDto> movies) {
        this.movies = movies;
    }

    public CreateMoviesDto() {}

    public List<CreateMovieDto> getMovies() {
        return movies;
    }

    public void setMovies(List<CreateMovieDto> movies) {
        this.movies = movies;
    }

    @Override
    public String toString() {
        return "CreateMoviesDto{" +
                "movies=" + movies +
                '}';
    }
}
