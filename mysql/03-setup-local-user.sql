CREATE USER 'conatel'@'%';
SET PASSWORD FOR 'conatel'@'%' = PASSWORD('C0n4t3l');

# The server can read any table in SQL
GRANT ALL PRIVILEGES ON local.* TO 'conatel'@'%';
