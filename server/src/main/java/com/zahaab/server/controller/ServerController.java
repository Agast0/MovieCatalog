package com.zahaab.server.controller;

import com.zahaab.server.common.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000"})
public class ServerController {
    @GetMapping("/healthcheck")
    public ResponseEntity<ApiResponse> healthCheck() {
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("server is live!"));
    }
}
