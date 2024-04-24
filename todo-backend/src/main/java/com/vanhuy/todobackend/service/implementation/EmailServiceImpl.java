package com.vanhuy.todobackend.service.implementation;

import com.vanhuy.todobackend.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.File;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String from;

    @Override
    @Async
    public void sendWelcomeEmail(String to, String firstName) {
        try{
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setFrom(from);
            mimeMessageHelper.setTo(to);
            mimeMessageHelper.setSubject("Welcome to our platform!");

            // create the thymeleaf context and add variables
            Context context = new Context();
            context.setVariable("firstName", firstName);

            // Process the template
            String htmlContent = templateEngine.process("welcome", context);

            mimeMessageHelper.setText(htmlContent, true);

            javaMailSender.send(mimeMessage);

        }catch (MessagingException e){
            e.printStackTrace();
        }
    }


    //    @Override
//    public String sendEmailWithAttachment(EmailDetails emailDetails) {
//        // create mimeMessage
//        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
//        MimeMessageHelper mimeMessageHelper;
//
//        try {
//            // create a message
//            mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);
//
//            mimeMessageHelper.setFrom(from);
//            mimeMessageHelper.setTo(emailDetails.getRecipient());
//            mimeMessageHelper.setSubject(emailDetails.getSubject());
//            mimeMessageHelper.setText(emailDetails.getMsgBody());
//
//            // add attachment
//            FileSystemResource file = new FileSystemResource(new File(emailDetails.getAttachment()));
//
//            mimeMessageHelper.addAttachment( file.getFilename(), file);
//
//            javaMailSender.send(mimeMessage);
//            return "Email sent successfully...";
//        } catch (MessagingException e) {
//            return "Email sending failed";
//        }
//    }

}
