-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS todo_app_database;

-- Switch to the newly created database
USE todo_app_database;

-- Create the users table
CREATE TABLE users (
    id bigint AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
    -- Add additional fields as needed
);

-- Create the todos table
CREATE TABLE todos (
    id bigint AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    completed BOOLEAN DEFAULT FALSE
);

