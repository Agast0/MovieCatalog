package com.zahaab.server.controller;

import com.zahaab.server.dto.LoginReqBodyDto;
import com.zahaab.server.exceptions.UserDoesNotExistException;
import com.zahaab.server.service.AdminUserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3000"})
public class AuthController {
    @Autowired
    AdminUserService adminUserService;

    @PostMapping("/login")
    public String login(@RequestBody @Valid LoginReqBodyDto loginReqBodyDto) throws UserDoesNotExistException {
        return adminUserService.login(loginReqBodyDto);
    }
}
