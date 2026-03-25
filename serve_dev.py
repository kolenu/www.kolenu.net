#!/usr/bin/env python3
"""Local static server that applies _redirects (same rules as Cloudflare Workers).

`python3 -m http.server` does not read _redirects — use this script for local testing.
"""

from __future__ import annotations

import argparse
import http.server
import socketserver
import urllib.parse
from pathlib import Path


def load_redirects(redirects_file: Path) -> dict[str, tuple[int, str]]:
    """Parse Cloudflare-style _redirects: <from> <to> <code>."""
    mapping: dict[str, tuple[int, str]] = {}
    if not redirects_file.is_file():
        return mapping
    for raw in redirects_file.read_text(encoding="utf-8").splitlines():
        line = raw.split("#", 1)[0].strip()
        if not line:
            continue
        parts = line.split()
        if len(parts) >= 3 and parts[-1].isdigit():
            code = int(parts[-1])
            dest = parts[-2]
            src = parts[0]
            mapping[src] = (code, dest)
    return mapping


def make_handler(
    directory: Path,
    redirects: dict[str, tuple[int, str]],
) -> type[http.server.SimpleHTTPRequestHandler]:
    class RedirectingHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(directory), **kwargs)

        def _maybe_redirect(self) -> bool:
            """Send redirect response if path matches _redirects; return True if handled."""
            parsed = urllib.parse.urlparse(self.path)
            path = parsed.path
            if path != "/" and path.endswith("/"):
                path = path.rstrip("/") or "/"
            if path not in redirects:
                return False
            code, location = redirects[path]
            if parsed.query:
                joiner = "&" if "?" in location else "?"
                location = f"{location}{joiner}{parsed.query}"
            self.send_response(code)
            self.send_header("Location", location)
            self.end_headers()
            return True

        def do_GET(self) -> None:
            if self._maybe_redirect():
                return
            super().do_GET()

        def do_HEAD(self) -> None:
            if self._maybe_redirect():
                return
            super().do_HEAD()

    return RedirectingHandler


def main() -> None:
    root = Path(__file__).resolve().parent
    parser = argparse.ArgumentParser(description="Serve www.kolenu.net with _redirects applied.")
    parser.add_argument("--port", "-p", type=int, default=8080)
    parser.add_argument(
        "--no-redirects",
        action="store_true",
        help="Ignore _redirects (same behaviour as python3 -m http.server).",
    )
    args = parser.parse_args()
    redirects: dict[str, tuple[int, str]] = {}
    if not args.no_redirects:
        redirects = load_redirects(root / "_redirects")
    handler = make_handler(root, redirects)
    with socketserver.TCPServer(("", args.port), handler) as httpd:
        print(f"Serving {root} at http://127.0.0.1:{args.port}/")
        if redirects:
            print("Active redirects:", ", ".join(f"{k} → {v[1]}" for k, v in redirects.items()))
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")


if __name__ == "__main__":
    main()
