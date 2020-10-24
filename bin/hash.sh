#!/bin/sh

echo "public/styles-$(node bin/hash.js ./public/sinanbolel.min.css | grep 'hash:' | cut -c6-13).min.css"
