# Kolenu Landing Website (kolenu.net)

Static landing page for the Kolenu prayer learning app.

## Preview locally

**Important:** The server must run from inside `www.kolenu.net` so images and styles load correctly.

```bash
cd www.kolenu.net
python3 -m http.server 8080
# Or: ./serve.sh
```

Then open http://localhost:8080

## Deploy

Upload `index.html`, `privacy.html`, `terms.html`, `support.html`, `styles.css`, `_redirects`, and `images/` to Cloudflare Pages (or your web host) for kolenu.net.

The `_redirects` file enables clean URLs: kolenu.net/privacy, kolenu.net/support, kolenu.net/terms.

## Customize before launch

- **Download button**: Update the TestFlight link in `index.html` (search for `testflight.apple.com`) with your actual beta invite URL.
- **Email addresses**: Replace `hello@kolenu.net` with your preferred contact address if needed.
- **GitHub link**: Update `https://github.com/kolenu/kolenu-app` in `index.html`, `privacy.html`, and `terms.html` if your repo URL differs.
