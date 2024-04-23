package com.vanhuy.todobackend.controller;

import com.vanhuy.todobackend.dtos.AuthenticationRequest;
import com.vanhuy.todobackend.dtos.AuthenticationResponse;
import com.vanhuy.todobackend.dtos.RegisterRequest;
import com.vanhuy.todobackend.exception.AuthenticationException;
import com.vanhuy.todobackend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private static final Logger logger = org.slf4j.LoggerFactory.getLogger(AuthenticationController.class);

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {

        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Object> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        try {
            AuthenticationResponse authenticated = authenticationService.authenticate(request);
            return ResponseEntity.ok(authenticated);
        } catch (AuthenticationException e) {
            logger.warn("Authentication failed: {}" , e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    AuthenticationResponse.builder()
                            .message(e.getMessage())
                            .build()
            );
        } catch (Exception e) {
            logger.error("Internal Server Error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }
}
