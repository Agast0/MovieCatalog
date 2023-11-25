package com.zahaab.server.controller;

import com.zahaab.server.dto.CreateAdminUserDto;
import com.zahaab.server.dto.CreateMovieDto;
import com.zahaab.server.dto.CreateMoviesDto;
import com.zahaab.server.dto.UpdateMovieDto;
import com.zahaab.server.exceptions.*;
import com.zahaab.server.model.Movie;
import com.zahaab.server.service.AdminUserService;
import com.zahaab.server.service.MovieService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.ArithmeticOperators;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminUserService adminUserService;
    @Autowired
    private MovieService movieService;

    @GetMapping("/verify-token")
    public String getUsernameFromToken(@RequestHeader("Authorization") String token) {
        return adminUserService.getUserByToken(token);
    }

    @PostMapping("/create-admin-user")
    public String createAdminUser(@RequestBody @Valid CreateAdminUserDto createAdminUserDto) throws AdminUserAlreadyExistsException {
        return adminUserService.createAdminUser(createAdminUserDto);
    }

    @DeleteMapping("/delete-admin-user")
    public String deleteAdminUser(@RequestParam(value = "username") String username) throws CannotDeleteDefaultAdminUserException, UserDoesNotExistException {
        return adminUserService.deleteAdminUser(username);
    }

    @PostMapping("/create-movie")
    public Movie createMovie(@RequestBody @Valid CreateMovieDto createMovieDto) throws MovieAlreadyExistsException {
        return movieService.createMovie(createMovieDto);
    }

    @PostMapping("/create-movies")
    public List<Movie> createMovies(@RequestBody @Valid CreateMoviesDto createMoviesDto) throws MovieAlreadyExistsException {
        return movieService.createMovies(createMoviesDto);
    }

    @PutMapping("/update-movie")
    public Movie updateMovie(@RequestBody @Valid UpdateMovieDto updateMovieDto) throws MovieDoesNotExistException {
        return movieService.updateMovie(updateMovieDto);
    }

    @DeleteMapping("/delete-movie")
    public String deleteMovie(@RequestParam("movieName") String name) throws MovieDoesNotExistException {
        return movieService.deleteMovie(name);
    }

}
