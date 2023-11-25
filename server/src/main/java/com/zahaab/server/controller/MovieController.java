package com.zahaab.server.controller;

import com.zahaab.server.exceptions.GenreDoesNotExistException;
import com.zahaab.server.exceptions.MovieDoesNotExistException;
import com.zahaab.server.exceptions.SortTypeDoesNotExistException;
import com.zahaab.server.model.Movie;
import com.zahaab.server.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = "http://localhost:3001")
public class MovieController {
    @Autowired
    MovieService movieService;
    @GetMapping("/all")
    public List<Movie> getAllMovies(
            @RequestParam(value = "sort", required = false) String sort,
            @RequestParam(value = "genre", required = false) String genre,
            @RequestParam(value = "search", required = false) String search
    ) throws SortTypeDoesNotExistException, GenreDoesNotExistException {
        return movieService.getAllMovies(sort, genre, search);
    }

    @GetMapping
    public Movie getMovie(@RequestParam("movieName") String name) throws MovieDoesNotExistException {
        return movieService.getMovieByName(name);
    }
}
