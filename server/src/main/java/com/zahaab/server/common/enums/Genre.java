package com.zahaab.server.common.enums;

import com.zahaab.server.exceptions.GenreDoesNotExistException;

public enum Genre {
    ACTION("Action"),
    DRAMA("Drama"),
    COMEDY("Comedy"),
    SCI_FI("Sci-Fi"),
    THRILLER("Thriller"),
    ROMANCE("Romance"),
    HORROR("Horror"),
    FANTASY("Fantasy"),
    MYSTERY("Mystery"),
    DOCUMENTARY("Documentary"),
    ;

    private final String displayName;

    Genre(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static Genre getByDisplayName(String displayName) throws GenreDoesNotExistException {
        for (Genre genre : Genre.values()) {
            if (genre.getDisplayName().equalsIgnoreCase(displayName)) {
                return genre;
            }
        }
        throw new GenreDoesNotExistException("Genre: " + displayName + " does not exist");
    }
}
