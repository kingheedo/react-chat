#!/bin/bash

# Function to request initial certificate
request_initial_certificate() {
    certbot certonly --webroot -w /usr/share/nginx/html \
    --non-interactive \
    --agree-tos \
    --email "$CERTBOT_EMAIL" \
    -d "$CERTBOT_DOMAIN1" \
    -d "$CERTBOT_DOMAIN2"
}

# Request initial certificate
request_initial_certificate

# Function to renew certificates
renew_certificates() {
    while :; do
        certbot renew --nginx --non-interactive
        sleep 12h
    done
}

# Start the renewal process
renew_certificates

