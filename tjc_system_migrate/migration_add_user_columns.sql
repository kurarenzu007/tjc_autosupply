-- Migration: Add missing columns to users table
-- Date: 2026-01-16
-- Purpose: Fix ER_BAD_FIELD_ERROR in UsersController.js

ALTER TABLE users 
ADD COLUMN middle_name VARCHAR(100) AFTER first_name,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Verify the changes
DESCRIBE users;
