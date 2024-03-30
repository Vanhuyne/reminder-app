package com.vanhuy.todobackend.repo;

import com.vanhuy.todobackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Long> {
}
