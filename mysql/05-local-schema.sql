CREATE DATABASE local;
USE local;

CREATE TABLE users (
  id INT(8) NOT NULL auto_increment,
  email VARCHAR(30),
  phone VARCHAR(20),
  username VARCHAR(30) NOT NULL,
  password CHAR(60) NOT NULL,
  deleted TINYINT(1) DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE INDEX id_UNIQUE (id ASC),
  UNIQUE INDEX username_UNIQUE (username ASC)
);

CREATE TABLE roles (
  role VARCHAR(20) NOT NULL,
  description VARCHAR(100),
  PRIMARY KEY (role),
  UNIQUE INDEX role_INDEX (role ASC)
);

CREATE TABLE user_roles (
  id INT(8) NOT NULL auto_increment,
  role VARCHAR(20) NOT NULL,
  userid INT(8) NOT NULL,
  PRIMARY KEY (id)
);