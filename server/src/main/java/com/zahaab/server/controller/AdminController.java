package com.zahaab.server.controller;

import com.zahaab.server.common.ApiResponse;
import com.zahaab.server.dto.CreateAdminUserDto;
import com.zahaab.server.dto.CreateMovieDto;
import com.zahaab.server.dto.CreateMoviesDto;
import com.zahaab.server.dto.UpdateMovieDto;
import com.zahaab.server.exceptions.*;
import com.zahaab.server.model.AdminUser;
import com.zahaab.server.model.Movie;
import com.zahaab.server.service.AdminUserService;
import com.zahaab.server.service.MovieService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000"})
public class AdminController {

    @Autowired
    private AdminUserService adminUserService;
    @Autowired
    private MovieService movieService;

    @GetMapping("/verify-token")
    public ApiResponse getUsernameFromToken(@RequestHeader("Authorization") String token) {
        String result = adminUserService.getUserByToken(token);
        return new ApiResponse(result);
    }

    @PostMapping("/create-admin-user")
    public ResponseEntity<ApiResponse> createAdminUser(@RequestBody @Valid CreateAdminUserDto createAdminUserDto) throws AdminUserAlreadyExistsException {
        String result = adminUserService.createAdminUser(createAdminUserDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(result));
    }

    @GetMapping("/all-admin-users")
    public List<AdminUser> getAllAdminUsers() {
        return adminUserService.getAllAdminUsers();
    }

    @DeleteMapping("/delete-admin-user")
    public ApiResponse deleteAdminUser(@RequestParam(value = "username") String username) throws CannotDeleteDefaultAdminUserException, UserDoesNotExistException {
        String result = adminUserService.deleteAdminUser(username);
        return new ApiResponse(result);
    }

    @PostMapping("/create-movie")
    public ResponseEntity<ApiResponse> createMovie(@RequestBody @Valid CreateMovieDto createMovieDto) throws MovieAlreadyExistsException {
        String result = movieService.createMovie(createMovieDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(result));
    }

    @PostMapping("/create-movies")
    public ResponseEntity<String> createMovies(@RequestBody @Valid CreateMoviesDto createMoviesDto) throws MovieAlreadyExistsException {
        String result = movieService.createMovies(createMoviesDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PatchMapping ("/update-movie")
    public Movie updateMovie(@RequestBody @Valid UpdateMovieDto updateMovieDto) throws MovieDoesNotExistException {
        return movieService.updateMovie(updateMovieDto);
    }

    @DeleteMapping("/delete-movie")
    public ApiResponse deleteMovie(@RequestParam("movieName") String name) throws MovieDoesNotExistException {
        String result = movieService.deleteMovie(name);
        return new ApiResponse(result);
    }

}
