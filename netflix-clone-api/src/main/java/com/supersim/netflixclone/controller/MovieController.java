package com.supersim.netflixclone.controller;

import com.supersim.netflixclone.movie.Movie;
import com.supersim.netflixclone.movie.MovieRepository;
import com.supersim.netflixclone.movie.MovieRequestDTO;
import com.supersim.netflixclone.movie.MovieResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("movies")
public class MovieController {

    private final MovieRepository repository;

    public MovieController(MovieRepository repository) {
        this.repository = repository;
    }
    public boolean containsMovie(final List<Movie> movieList, final String title) {
        return movieList.stream().anyMatch(movie -> movie.getTitle().equals(title));
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<Object> saveNewMovie(@RequestBody MovieRequestDTO data) {

        Movie movieData = new Movie(data);
        List<Movie> movieList = repository.findAll();

        if (containsMovie(movieList, data.title())) {
            Map<String, String> errorResponseData = new HashMap<>();
            errorResponseData.put("status", HttpStatus.CONFLICT.toString());
            errorResponseData.put("message", "Movie title already registered");

             return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponseData);
        }

        repository.save(movieData);
        Map<String, String> successResponseData = new HashMap<>();
        successResponseData.put("status", HttpStatus.CREATED.toString());
        successResponseData.put("message", "Movie has been added to roster");
        return ResponseEntity.status(HttpStatus.CREATED).body(successResponseData);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<MovieResponseDTO> getAll() {

        List<Movie> movieList = repository.findAll();
        return movieList.stream().map(MovieResponseDTO::new).toList();

    }
}
