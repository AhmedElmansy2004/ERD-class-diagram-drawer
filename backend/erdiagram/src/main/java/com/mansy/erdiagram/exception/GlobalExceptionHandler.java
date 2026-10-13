package com.mansy.erdiagram.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    public record ErrorResponse(String message) {}

    private static final org.slf4j.Logger log =
        org.slf4j.LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(GenerationException.class)
    public ResponseEntity<ErrorResponse> handleGeneration(GenerationException e) {
        log.warn("Generation failed: {}", e.getMessage(), e);
        return ResponseEntity.status(e.getStatus()).body(new ErrorResponse(e.getMessage()));
    }
}