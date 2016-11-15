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
GRANT SELECT ON radius.* TO 'radius'@'%';

# The server can write to the accounting and post-auth logging table.
#
#  i.e.
GRANT ALL on radius.radacct TO 'radius'@'%';
GRANT ALL on radius.radpostauth TO 'radius'@'%';