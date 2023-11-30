package com.zahaab.server.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000"})
public class ServerController {
    @GetMapping("/healthcheck")
    public String healthCheck() {
        return "server is live!";
    }
}
