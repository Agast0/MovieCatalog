package com.zahaab.server.service;

import com.zahaab.server.common.enums.Genre;
import com.zahaab.server.common.enums.SortType;
import com.zahaab.server.dto.CreateMovieDto;
import com.zahaab.server.dto.CreateMoviesDto;
import com.zahaab.server.dto.UpdateMovieDto;
import com.zahaab.server.exceptions.GenreDoesNotExistException;
import com.zahaab.server.exceptions.MovieAlreadyExistsException;
import com.zahaab.server.exceptions.MovieDoesNotExistException;
import com.zahaab.server.exceptions.SortTypeDoesNotExistException;
import com.zahaab.server.model.Movie;
import com.zahaab.server.repo.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    @Autowired
    private MovieRepo movieRepo;
    @Autowired
    private MongoTemplate mongoTemplate;

    public Movie getMovieByName(String name) throws MovieDoesNotExistException {
        Optional<Movie> movie = movieRepo.findById(name);

        if (movie.isEmpty()) throw new MovieDoesNotExistException("Movie does not exist");

        return movie.get();
    }

    private Movie createMovieHelper(CreateMovieDto createMovieDto) throws MovieAlreadyExistsException {
        Movie toBeAdded = new Movie(
                createMovieDto.getName(),
                createMovieDto.getBase64Image(),
                createMovieDto.getDescription(),
                createMovieDto.getGenre(),
                createMovieDto.getRating()
        );

        boolean doesMovieAlreadyExist = movieRepo.existsById(toBeAdded.getName());
        if (doesMovieAlreadyExist) throw new MovieAlreadyExistsException("Movie already exists");

        return movieRepo.save(toBeAdded);
    }

    public String createMovie(CreateMovieDto createMovieDto) throws MovieAlreadyExistsException {
        createMovieHelper(createMovieDto);
        return "Movie created successfully!";
    }

    public List<Movie> getAllMovies(String sort, String genre, String search) throws SortTypeDoesNotExistException, GenreDoesNotExistException {
        Query query = new Query();

        // Apply search filters
        if (search != null) {
            query.addCriteria(Criteria.where("name").regex(search, "i"));
        } else {
            query.addCriteria(Criteria.where("name").exists(true));
        }

        // Apply genre filters
        if (genre != null) {
            Genre genreFilter = Genre.getByDisplayName(genre);
            query.addCriteria(Criteria.where("genre").is(genreFilter.getDisplayName()));
        }

        // Apply sort
        if (sort != null) {
            SortType sortType = SortType.getByDisplayName(sort);
            query.with(sortType.getSort());
        }

        return mongoTemplate.find(query, Movie.class);
    }

    public Movie updateMovie(UpdateMovieDto updateMovieDto) throws MovieDoesNotExistException {
        Movie toBeUpdated = getMovieByName(updateMovieDto.getName());

        toBeUpdated.setBase64Image(updateMovieDto.getBase64Image());
        toBeUpdated.setDescription(updateMovieDto.getDescription());
        toBeUpdated.setGenre(updateMovieDto.getGenre());
        toBeUpdated.setRating(updateMovieDto.getRating());

        return movieRepo.save(toBeUpdated);
    }

    public String deleteMovie(String name) throws MovieDoesNotExistException {
        getMovieByName(name); // throws error if movie does not exist
        movieRepo.deleteById(name);
        return "Movie deleted successfully!";
    }

    public String createMovies(CreateMoviesDto createMoviesDto) throws MovieAlreadyExistsException {
        List<Movie> createdMovies = new ArrayList<Movie>();

        for (CreateMovieDto movie: createMoviesDto.getMovies()) {
            createdMovies.add(createMovieHelper(movie));
        }

        return "Movies created successfully!";
    }
}
