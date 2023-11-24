package com.zahaab.server.exceptions;

public class MovieAlreadyExistsException extends Exception {
    public MovieAlreadyExistsException(String message) {
        super(message);
    }
}
