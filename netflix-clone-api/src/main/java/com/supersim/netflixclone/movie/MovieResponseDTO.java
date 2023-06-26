package com.supersim.netflixclone.movie;

import java.util.UUID;

public record MovieResponseDTO(UUID id, String title, String description, String coverImage, Integer stars) {
    public MovieResponseDTO(Movie movie) {
        this(movie.getId(), movie.getTitle(), movie.getDescription(), movie.getCoverImage(), movie.getStars());
    }
}
