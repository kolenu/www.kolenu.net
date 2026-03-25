# Kolenu Landing Website (kolenu.net)

Static landing page for the Kolenu app.

## Test before commit

Run a local server from inside this directory so images and styles load correctly.

**Use `./serve.sh` or `python3 serve_dev.py`** — these read `_redirects`, so `/support`, `/privacy`, and `/terms` behave like production.

`python3 -m http.server` only serves files; it **does not** apply `_redirects` (that happens on Cloudflare when deployed).

```bash
cd www.kolenu.net
./serve.sh
# Or: python3 serve_dev.py --port 8080
# Plain static only (no redirects): python3 serve_dev.py --no-redirects
```

Open http://localhost:8080 and verify links, layout, and content before committing.

## Deploy
The domain and web are hosted by Cloudflare Pages, commit and push the change to github repository, Cloudflare will pull the new contents directly.

# TODO:
- **Download button**: Update the TestFlight link in `index.html` (search for `testflight.apple.com`) with your actual beta invite URL.
- **Privacy & Terms**: `privacy.html` and `terms.html` are generated from `tool/legal/` — do not edit them directly. Run `python3 tool/legal/sync_legal.py --sync` from kolenu-workspace to regenerate. To change the GitHub link in the footer, edit `tool/legal/sync_legal.py`.
