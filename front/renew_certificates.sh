#!/bin/sh

# Renew the certificates
certbot renew --nginx --non-interactive --quiet

# Reload Nginx to apply the new certificates
nginx -s reload
