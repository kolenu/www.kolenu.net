#!/bin/bash
# Serve the site from this directory. Run from anywhere:
#   ./serve.sh
# or: bash serve.sh
cd "$(dirname "$0")"
exec python3 serve_dev.py "$@"
