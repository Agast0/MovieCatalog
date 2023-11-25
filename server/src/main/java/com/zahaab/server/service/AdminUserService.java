package com.zahaab.server.service;

import com.zahaab.server.dto.CreateAdminUserDto;
import com.zahaab.server.dto.LoginReqBodyDto;
import com.zahaab.server.exceptions.AdminUserAlreadyExistsException;
import com.zahaab.server.exceptions.CannotDeleteDefaultAdminUserException;
import com.zahaab.server.exceptions.UserDoesNotExistException;
import com.zahaab.server.model.AdminUser;
import com.zahaab.server.repo.AdminUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public AdminUser getUserByUsername(String username) throws UserDoesNotExistException {
        Optional<AdminUser> user = adminUserRepo.findById(username);

        if (user.isEmpty()) {
            throw new UserDoesNotExistException("User does not exist");
        }

        return user.get();
    }

    public String createAdminUser(CreateAdminUserDto createAdminUserDto) throws AdminUserAlreadyExistsException {
        AdminUser newUser = new AdminUser(
                passwordEncoder.encode(createAdminUserDto.getPassword()), createAdminUserDto.getUsername()
        );

        boolean doesUserAlreadyExist = adminUserRepo.existsById(newUser.getUsername());

        if (doesUserAlreadyExist) {
            throw new AdminUserAlreadyExistsException("Admin with username " + newUser.getUsername() + " already exists.");
        } else {
            adminUserRepo.save(newUser);
        }

        return "User created succesfully!";
    }

    public String deleteAdminUser(String username) throws CannotDeleteDefaultAdminUserException, UserDoesNotExistException {
        AdminUser toBeDeleted = getUserByUsername(username);

        if (!toBeDeleted.getUsername().equals("admin")) { // Not allowed to delete default admin user
            adminUserRepo.deleteById(toBeDeleted.getUsername());
        } else {
            throw new CannotDeleteDefaultAdminUserException("Cannot delete default admin user");
        }

        return "User deleted successfully!";
    }

    public String login(LoginReqBodyDto loginReqBodyDto) throws UserDoesNotExistException {
        Optional<AdminUser> defaultAdminUser = adminUserRepo.findById("admin");

        if (defaultAdminUser.isEmpty()) { // if no default user exists, create the default admin user
            AdminUser newUser = new AdminUser(passwordEncoder.encode("password"), "admin");
            adminUserRepo.save(newUser);
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginReqBodyDto.getUsername(),
                        loginReqBodyDto.getPassword()
                )
        );

        AdminUser user = getUserByUsername(loginReqBodyDto.getUsername());

        return jwtService.generateToken(user);
    }

    public String getUserByToken(String token) {
        return jwtService.extractUsername(token.substring(7));
    }
}
