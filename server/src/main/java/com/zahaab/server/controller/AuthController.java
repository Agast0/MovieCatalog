package com.zahaab.server.controller;

import com.zahaab.server.dto.LoginReqBody;
import com.zahaab.server.service.AdminUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AdminUserService adminUserService;

    @GetMapping("/login")
    public String login(@RequestBody LoginReqBody loginReqBody) {
        return adminUserService.login(loginReqBody);
    }
}
