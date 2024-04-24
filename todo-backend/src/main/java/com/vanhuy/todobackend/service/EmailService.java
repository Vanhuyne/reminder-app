package com.vanhuy.todobackend.service;

public interface EmailService {
//      String sendEmailWithAttachment(EmailDetails emailDetails);
        void sendWelcomeEmail(String to, String firstName);
}
