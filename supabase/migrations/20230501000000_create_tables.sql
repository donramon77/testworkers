-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS revenue (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS sales (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS active_users (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  count INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS traffic_sources (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  source_type TEXT NOT NULL,
  count INTEGER NOT NULL,
  date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS platform_clicks (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  platform TEXT NOT NULL,
  invalid INTEGER NOT NULL,
  suspicious INTEGER NOT NULL,
  legitimate INTEGER NOT NULL,
  date DATE NOT NULL
);

-- Insert test data for user with UID: 583e5944-0ee3-4115-9b22-6e72c66a81d7
INSERT INTO users (id, email) VALUES ('583e5944-0ee3-4115-9b22-6e72c66a81d7', 'test@example.com');

-- Insert revenue data
INSERT INTO revenue (user_id, amount, date) VALUES
('583e5944-0ee3-4115-9b22-6e72c66a81d7', 45231.89, CURRENT_DATE),
('583e5944-0ee3-4115-9b22-6e72c66a81d7', 37684.22, CURRENT_DATE - INTERVAL '1 month');

-- Insert subscription data
INSERT INTO subscriptions (user_id, date) VALUES
('583e5944-0ee3-4115-9b22-6e72c66a81d7', CURRENT_DATE),
('583e5944-0ee3-4115-9b22-6e72c66a81d7', CURRENT_DATE - INTERVAL '1 day'),
('583e5944-0ee3-4115-9b22-6e72c66a81d7', CURRENT_DATE - INTERVAL '2 days');

-- Insert sales data
INSERT INTO sales (user_id, amount, date) VALUES
('583e5944-0ee3-4115-9b22-6e72c66a81d7', 12234, CURRENT_DATE),
('583e5944-0ee3-4115-9b22-6e72c66a81d7', 10280, CURRENT_DATE - INTERVAL '1 month');

-- Insert active users data
INSERT INTO active_users (user_id, date, count) VALUES
('583e5944-0ee3-4115-9b22-6e72c66a81d7', CURRENT_DATE, 573),
('583e5944-0ee3-4115-9b22-6e72c66a81d7', CURRENT_DATE - INTERVAL '1 hour', 372);

-- Insert traffic sources data
INSERT INTO traffic_sources (user_id, source_type, count, date) VALUES
('583e5944-0ee3-4115-9b22-6e72c66a81d7', 'legitimate', 78386, CURRENT_DATE),
('583e5944-0ee3-4115-9b22-6e72c66a81d7', 'suspicious', 8615, CURRENT_DATE),
('583e5944-0ee3-4115-9b22-6e72c66a81d7', 'invalid', 18225, CURRENT_DATE);

-- Insert platform clicks data
INSERT INTO platform_clicks (user_id, platform, invalid, suspicious, legitimate, date) VALUES
('583e5944-0ee3-4115-9b22-6e72c66a81d7', 'Google', 11400, 4300, 56000, CURRENT_DATE),
('583e5944-0ee3-4115-9b22-6e72c66a81d7', 'X', 4300, 3700, 15200, CURRENT_DATE),
('583e5944-0ee3-4115-9b22-6e72c66a81d7', 'Pinterest', 0, 0, 0, CURRENT_DATE),
('583e5944-0ee3-4115-9b22-6e72c66a81d7', 'LinkedIn', 1100, 358, 3200, CURRENT_DATE);