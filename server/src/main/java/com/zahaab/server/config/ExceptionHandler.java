package com.zahaab.server.config;

import com.zahaab.server.common.ApiResponse;
import com.zahaab.server.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @org.springframework.web.bind.annotation.ExceptionHandler(MethodArgumentNotValidException.class) // validation errors
    public Map<String, String> handleInvalidArgument(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(error -> {
            errors.put(error.getField(), error.getDefaultMessage());
        });

        return errors;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @org.springframework.web.bind.annotation.ExceptionHandler(AdminUserAlreadyExistsException.class)
    public ApiResponse handleInternalError(AdminUserAlreadyExistsException e) {
        return new ApiResponse(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @org.springframework.web.bind.annotation.ExceptionHandler(CannotDeleteDefaultAdminUserException.class)
    public ApiResponse handleInternalError(CannotDeleteDefaultAdminUserException e) {
        return new ApiResponse(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @org.springframework.web.bind.annotation.ExceptionHandler(UserDoesNotExistException.class)
    public ApiResponse handleInternalError(UserDoesNotExistException e) {
        return new ApiResponse(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @org.springframework.web.bind.annotation.ExceptionHandler(MovieDoesNotExistException.class)
    public ApiResponse handleInternalError(MovieDoesNotExistException e) {
        return new ApiResponse(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @org.springframework.web.bind.annotation.ExceptionHandler(MovieAlreadyExistsException.class)
    public ApiResponse handleInternalError(MovieAlreadyExistsException e) {
        return new ApiResponse(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @org.springframework.web.bind.annotation.ExceptionHandler(MissingServletRequestParameterException.class)
    public ApiResponse handleInternalError(MissingServletRequestParameterException e) {
        return new ApiResponse(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @org.springframework.web.bind.annotation.ExceptionHandler(SortTypeDoesNotExistException.class)
    public ApiResponse handleInternalError(SortTypeDoesNotExistException e) {
        return new ApiResponse(e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @org.springframework.web.bind.annotation.ExceptionHandler(GenreDoesNotExistException.class)
    public ApiResponse handleInternalError(GenreDoesNotExistException e) {
        return new ApiResponse(e.getMessage());
    }
}
