package com.zahaab.server.repo;

import com.zahaab.server.model.AdminUser;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminUserRepo extends MongoRepository<AdminUser, String> {
}
