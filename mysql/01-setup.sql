CREATE USER 'radius'@'%';
SET PASSWORD FOR 'radius'@'%' = PASSWORD('radpass');

# The server can read any table in SQL
GRANT ALL PRIVILEGES ON radius.* TO 'radius'@'%';
