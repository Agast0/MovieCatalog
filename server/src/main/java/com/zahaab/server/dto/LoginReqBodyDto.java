package com.zahaab.server.dto;

import jakarta.validation.constraints.NotEmpty;

public class LoginReqBodyDto {
    @NotEmpty
    private String password;
    @NotEmpty
    private String username;

    public LoginReqBodyDto(String password, String username) {
        this.password = password;
        this.username = username;
    }

    public LoginReqBodyDto() {}

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "LoginReqBody{" +
                "password='" + password + '\'' +
                ", username='" + username + '\'' +
                '}';
    }
}
