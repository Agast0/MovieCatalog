package com.zahaab.server.service;

import com.zahaab.server.dto.LoginReqBody;
import com.zahaab.server.model.AdminUser;
import com.zahaab.server.repo.AdminUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminUserService {
    @Autowired
    private AdminUserRepo adminUserRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;

    public AdminUser getUserByUsername(String username) {
        return adminUserRepo
                .findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
    }

    public String login(LoginReqBody loginReqBody) {
        List<AdminUser> users = adminUserRepo.findAll();

        if (users.isEmpty()) { // if no user exists, create the default admin user
            AdminUser newUser = new AdminUser(passwordEncoder.encode("password"), "admin");
            adminUserRepo.save(newUser);
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginReqBody.getUsername(),
                        loginReqBody.getPassword()
                )
        );

        AdminUser user = getUserByUsername(loginReqBody.getUsername());

        return jwtService.generateToken(user);
    }
}
