package com.zahaab.server.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "movies")
public class Movie {
    @Id
    private String name;
    private String base64Image;
    private String description;
    private double rating;

    Movie(String name, String image, String desc, double rating) {
        this.name = name;
        this.base64Image = image;
        this.description = desc;
        this.rating = rating;
    }

    Movie() {}

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

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "name='" + name + '\'' +
                ", base64Image='" + base64Image + '\'' +
                ", description='" + description + '\'' +
                ", rating=" + rating +
                '}';
    }
}
