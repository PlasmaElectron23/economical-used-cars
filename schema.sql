-- This ensures we start with a clean slate every time we run the file
DROP TABLE IF EXISTS cars;

CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    price REAL NOT NULL,
    miles INTEGER,
    images TEXT,           -- Comma-separated list of R2 filenames
    description TEXT,      -- Detailed car description for customers
    is_featured INTEGER DEFAULT 0, -- 1 if it's a "Top 3" favorite, 0 if not
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);