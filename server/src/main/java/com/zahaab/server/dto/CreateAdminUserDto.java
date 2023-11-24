package com.zahaab.server.dto;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateAdminUserDto {
    @Size(min = 4, message = "Username must be at least 4 characters")
    @Size(max = 15, message = "Username must be less than 15 characters")
    @NotNull(message = "Username is required")
    private String username;
    @NotNull(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    @Size(max = 50, message = "Username must be less than 50 characters")
    private String password;

    public CreateAdminUserDto(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public CreateAdminUserDto() {}

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "CreateAdminUserDto{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
