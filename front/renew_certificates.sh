#!/bin/bash

while true; do
  certbot renew --nginx --quiet
  sleep 12h
done
