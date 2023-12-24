package com.zahaab.server.controller;

import com.zahaab.server.exceptions.GenreDoesNotExistException;
import com.zahaab.server.exceptions.MovieDoesNotExistException;
import com.zahaab.server.exceptions.SortTypeDoesNotExistException;
import com.zahaab.server.model.Movie;
import com.zahaab.server.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000"})
public class MovieController {
    @Autowired
    MovieService movieService;
    @GetMapping("/all")
    public ResponseEntity<List<Movie>> getAllMovies(
            @RequestParam(value = "sort", required = false) String sort,
            @RequestParam(value = "genre", required = false) String genre,
            @RequestParam(value = "search", required = false) String search
    ) throws SortTypeDoesNotExistException, GenreDoesNotExistException {
        List<Movie> result = movieService.getAllMovies(sort, genre, search);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping
    public ResponseEntity<Movie> getMovie(@RequestParam("movieName") String name) throws MovieDoesNotExistException {
        Movie result = movieService.getMovieByName(name);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
