package com.zahaab.server.common.enums;

import com.zahaab.server.exceptions.SortTypeDoesNotExistException;
import org.springframework.data.domain.Sort;

public enum SortType {
    ALPHABET_ASC("alphabet-asc") {
        @Override
        public Sort getSort() {
            return Sort.by(Sort.Direction.ASC, "name");
        }
    },
    ALPHABET_DESC("alphabet-desc") {
        @Override
        public Sort getSort() {
            return Sort.by(Sort.Direction.DESC, "name");
        }
    },
    RATING_ASC("rating-asc") {
        @Override
        public Sort getSort() {
            return Sort.by(Sort.Direction.ASC, "rating");
        }
    },
    RATING_DESC("rating-desc") {
        @Override
        public Sort getSort() {
            return Sort.by(Sort.Direction.DESC, "rating");
        }
    };

    private final String displayName;

    SortType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    // Abstract method to get Sort instance
    public abstract Sort getSort();

    // Static method to get SortType by display name
    public static SortType getByDisplayName(String displayName) throws SortTypeDoesNotExistException {
        for (SortType sortType : SortType.values()) {
            if (sortType.getDisplayName().equalsIgnoreCase(displayName)) {
                return sortType;
            }
        }
        throw new SortTypeDoesNotExistException("Sort type: " + displayName + " does not exist");
    }
}
