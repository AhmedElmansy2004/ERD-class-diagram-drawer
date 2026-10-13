package com.mansy.erdiagram.exception;

import org.springframework.http.HttpStatus;

public class GenerationException extends RuntimeException {

    private final HttpStatus status;

    public GenerationException(HttpStatus status, String message, Throwable cause) {
        super(message, cause);
        this.status = status;
    }

    public GenerationException(HttpStatus status, String message) {
        this(status, message, null);
    }

    public HttpStatus getStatus() {
        return status;
    }
}