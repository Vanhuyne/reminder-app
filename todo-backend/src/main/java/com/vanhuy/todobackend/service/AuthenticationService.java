package com.vanhuy.todobackend.service;

import com.vanhuy.todobackend.dtos.AuthenticationRequest;
import com.vanhuy.todobackend.dtos.AuthenticationResponse;
import com.vanhuy.todobackend.dtos.RegisterRequest;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse authenticate(AuthenticationRequest request);
}
