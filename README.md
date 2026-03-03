# Kolenu Landing Website (kolenu.net)

Static landing page for the Kolenu prayer learning app.

## Test before commit

Run a local server from inside this directory so images and styles load correctly:

```bash
cd www.kolenu.net
python3 -m http.server 8080
# Or: ./serve.sh
```

Open http://localhost:8080 and verify links, layout, and content before committing.

## Deploy

Upload `index.html`, `privacy.html`, `terms.html`, `support.html`, `styles.css`, `_redirects`, and `images/` to Cloudflare Pages (or your web host) for kolenu.net.

The `_redirects` file enables clean URLs: kolenu.net/privacy, kolenu.net/support, kolenu.net/terms.

**If Privacy/Terms links return 404:** Ensure the deployment root contains `privacy.html` and `terms.html` (not in a subfolder).

## Customize before launch

- **Download button**: Update the TestFlight link in `index.html` (search for `testflight.apple.com`) with your actual beta invite URL.
- **Email addresses**: Replace `hello@kolenu.net` with your preferred contact address if needed.
- **Privacy & Terms**: `privacy.html` and `terms.html` are generated from `tool/legal/` — do not edit them directly. Run `python3 tool/legal/sync_legal.py --sync` from kolenu-workspace to regenerate. To change the GitHub link in the footer, edit `tool/legal/sync_legal.py`.
