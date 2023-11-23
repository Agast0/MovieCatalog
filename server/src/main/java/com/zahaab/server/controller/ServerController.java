package com.zahaab.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServerController {
    @GetMapping("/healthcheck")
    public String healthCheck() {
        return "server is live!";
    }
}
