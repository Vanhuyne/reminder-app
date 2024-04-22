package com.vanhuy.todobackend.repo;

import com.vanhuy.todobackend.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface RoleRepo extends JpaRepository<Role, Long> {

    Optional<Role> findByName(String name);
}
