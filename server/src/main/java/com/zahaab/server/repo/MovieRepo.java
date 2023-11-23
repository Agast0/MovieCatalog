package com.zahaab.server.repo;

import com.zahaab.server.model.Movie;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MovieRepo extends MongoRepository<Movie, String> {
}
