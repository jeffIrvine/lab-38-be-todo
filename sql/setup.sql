DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title varchar(256) NOT NULL,
  description varchar(512),
  created_on TIMESTAMP NOT NULL
)
