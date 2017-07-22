DROP DATABASE IF EXISTS acsc_db;
CREATE DATABASE acsc_db;

\c acsc_db;

CREATE TABLE athletes (
  ID SERIAL PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR,
  age INTEGER,
  sex VARCHAR
);

CREATE TABLE events (
  ID SERIAL PRIMARY KEY,
  location VARCHAR,
  event_date date
);

CREATE TABLE results (
  athlete_id integer REFERENCES athletes ON DELETE CASCADE,
  event_id integer REFERENCES events ON DELETE CASCADE,
  score numeric,
  PRIMARY KEY (athlete_id, event_id)
);

-- create athletes table

INSERT INTO athletes (first_name, last_name, age, sex)
VALUES ('Jon', 'Laz', 23, 'M');

INSERT INTO athletes (first_name, last_name, age, sex)
VALUES ('Maggie', 'Obryan', 23, 'F');

INSERT INTO athletes (first_name, last_name, age, sex)
VALUES ('Ethan', 'Fowler', 25, 'M');

-- create events table

INSERT INTO events (location, event_date)
VALUES ('Wisp', '1/1/2017');

INSERT INTO events (location, event_date)
VALUES ('Blue Knob', '1/8/2017');

INSERT INTO events (location, event_date)
VALUES ('7 Springs', '1/15/2017');

-- create results table

INSERT INTO results (athlete_id, event_id, score)
VALUES (1, 1, 80);
INSERT INTO results (athlete_id, event_id, score)
VALUES (1, 2, 70);
INSERT INTO results (athlete_id, event_id, score)
VALUES (1, 3, 60);

INSERT INTO results (athlete_id, event_id, score)
VALUES (2, 1, 75);
INSERT INTO results (athlete_id, event_id, score)
VALUES (2, 2, 75);
INSERT INTO results (athlete_id, event_id, score)
VALUES (2, 3, 75);