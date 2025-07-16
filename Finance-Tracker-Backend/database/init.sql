-- Initialize database with basic setup
-- This file will be executed when the PostgreSQL container starts

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- You can add any initial data or setup here
-- For example, creating default categories:

-- Note: This is just an example. In a real application, you might want to
-- handle this through your application's migration system or seed scripts 