package com.zahaab.server.exceptions;

public class UserDoesNotExistException extends Exception {
    public UserDoesNotExistException(String message) {
        super(message);
    }
}
