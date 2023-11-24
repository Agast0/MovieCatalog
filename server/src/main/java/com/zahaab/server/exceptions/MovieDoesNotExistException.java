package com.zahaab.server.exceptions;

public class MovieDoesNotExistException extends Exception {
    public MovieDoesNotExistException(String message) {
        super(message);
    }
}
