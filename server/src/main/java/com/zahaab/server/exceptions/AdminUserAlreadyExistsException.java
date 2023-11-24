package com.zahaab.server.exceptions;

public class AdminUserAlreadyExistsException extends Exception {
    public AdminUserAlreadyExistsException(String message) {
        super(message);
    }
}
