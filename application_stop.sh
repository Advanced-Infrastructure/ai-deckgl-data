#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing fe-config server"
sudo kill -9 $(sudo lsof -t -i:3000)
