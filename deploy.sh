#!/bin/bash

docker-compose up -d
sudo docker cp conatelradius_freeradius_1:/etc/raddb/certs/ca.pem ./tmp/ca.pem
sudo docker cp conatelradius_freeradius_1:/etc/raddb/certs/client.p12 ./tmp/client.p12
