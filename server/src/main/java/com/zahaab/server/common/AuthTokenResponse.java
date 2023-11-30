package com.zahaab.server.common;

public class AuthTokenResponse {
    private String authToken;

    public AuthTokenResponse(String authToken) {
        this.authToken = authToken;
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }
}
