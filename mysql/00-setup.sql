# -*- text -*-
##
## admin.sql -- MySQL commands for creating the RADIUS user.
##
#
## Source: https://github.com/vimagick/dockerfiles/blob/master/freeradius/mysql/00-setup.sql

#
#  Create default administrator for RADIUS
#
CREATE USER 'radius'@'%';
SET PASSWORD FOR 'radius'@'%' = PASSWORD('radpass');

# The server can read any table in SQL
GRANT ALL PRIVILEGES ON radius.* TO 'radius'@'%';
