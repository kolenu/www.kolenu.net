#!/bin/bash
# Serve the site from this directory. Run from anywhere:
#   ./serve.sh
# or: bash serve.sh
cd "$(dirname "$0")"
python3 -m http.server 8080
echo "Open http://localhost:8080"
