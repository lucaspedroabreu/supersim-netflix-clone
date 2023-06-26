package com.supersim.netflixclone.movie;

import jakarta.persistence.*;

import lombok.*;

import java.util.UUID;

@Entity
@Table(name = Movie.TABLE_NAME)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Movie {
    public static final String TABLE_NAME="movies";

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String title;
    private String description;
    private String coverImage;
    private Integer stars = 0;

    public Movie(MovieRequestDTO data) {
        this.title = data.title();
        this.description = data.description();
        this.coverImage = data.coverImage();
        this.stars = 0;
    }
}
