-- Drop the table if it exists to start fresh (Optional: only if you want to reset)
-- DROP TABLE IF EXISTS cars;

CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    price REAL NOT NULL,
    miles INTEGER,
    images TEXT, -- This is the crucial column for 2.8
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);