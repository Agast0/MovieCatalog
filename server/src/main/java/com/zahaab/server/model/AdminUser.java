package com.zahaab.server.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "user")
public class AdminUser {
    private Integer id;
    private String authToken;
    private String password;

    public AdminUser(Integer id, String authToken, String password) {
        this.id = id;
        this.authToken = authToken;
        this.password = password;
    }

    public AdminUser() {}

    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "AdminUser{" +
                "id=" + id +
                ", authToken='" + authToken + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
