package com.zahaab.server.dto;

import jakarta.validation.constraints.*;

public class UpdateMovieDto {
    @NotEmpty(message = "Name cannot be empty")
    private String name;
    @NotEmpty(message = "Image cannot be empty")
    private String base64Image;
    @NotEmpty(message = "Description cannot be empty")
    private String description;
    @NotEmpty(message = "Genre cannot be empty")
    private String genre;
    @NotNull(message = "Rating cannot be empty")
    @Max(value = 5, message = "Rating cannot be more than 5.0")
    @Min(value = 0, message = "Rating cannot be less than 0.0")
    private double rating;

    public UpdateMovieDto(String name, String base64Image, String description, String genre, double rating) {
        this.name = name;
        this.base64Image = base64Image;
        this.description = description;
        this.genre = genre;
        this.rating = rating;
    }

    public UpdateMovieDto() {}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBase64Image() {
        return base64Image;
    }

    public void setBase64Image(String base64Image) {
        this.base64Image = base64Image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    @Override
    public String toString() {
        return "UpdateMovieDto{" +
                "name='" + name + '\'' +
                ", base64Image='" + base64Image + '\'' +
                ", description='" + description + '\'' +
                ", genre='" + genre + '\'' +
                ", rating=" + rating +
                '}';
    }
}
