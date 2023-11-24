package com.zahaab.server.dto;

public class LoginReqBody {
    private String password;
    private String username;

    public LoginReqBody(String password, String username) {
        this.password = password;
        this.username = username;
    }

    public LoginReqBody() {}

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
