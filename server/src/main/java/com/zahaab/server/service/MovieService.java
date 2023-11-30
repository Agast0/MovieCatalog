package com.zahaab.server.service;

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
import org.springframework.data.domain.Sort;
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

    public Movie createMovieHelper(CreateMovieDto createMovieDto) throws MovieAlreadyExistsException {
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
            switch (genre.toLowerCase()) {
                case "action":
                    query.addCriteria(Criteria.where("genre").is("Action"));
                    break;
                case "drama":
                    query.addCriteria(Criteria.where("genre").is("Drama"));
                    break;
                case "comedy":
                    query.addCriteria(Criteria.where("genre").is("Comedy"));
                    break;
                case "sci-fi":
                    query.addCriteria(Criteria.where("genre").is("Sci-Fi"));
                    break;
                case "thriller":
                    query.addCriteria(Criteria.where("genre").is("Thriller"));
                    break;
                case "romance":
                    query.addCriteria(Criteria.where("genre").is("Romance"));
                    break;
                case "horror":
                    query.addCriteria(Criteria.where("genre").is("Horror"));
                    break;
                case "fantasy":
                    query.addCriteria(Criteria.where("genre").is("Fantasy"));
                    break;
                case "mystery":
                    query.addCriteria(Criteria.where("genre").is("Mystery"));
                    break;
                case "documentary":
                    query.addCriteria(Criteria.where("genre").is("Documentary"));
                    break;
                default:
                    throw new GenreDoesNotExistException("Genre does not exist");
            }
        }


        // Apply sort
        if (sort != null) {
            switch (sort) {
                case "alphabet-asc":
                    query.with(Sort.by(Sort.Direction.ASC, "name"));
                    break;
                case "alphabet-desc":
                    query.with(Sort.by(Sort.Direction.DESC, "name"));
                    break;
                case "rating-asc":
                    query.with(Sort.by(Sort.Direction.ASC, "rating"));
                    break;
                case "rating-desc":
                    query.with(Sort.by(Sort.Direction.DESC, "rating"));
                    break;
                default:
                    throw new SortTypeDoesNotExistException("Sort type does not exist");
            }
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
