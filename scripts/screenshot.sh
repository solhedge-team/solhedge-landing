#!/usr/bin/env bash
# Full-page screenshots of the landing at desktop and mobile widths.
# Usage: scripts/screenshot.sh [url] [outdir]   (dev server must be running)
set -euo pipefail
URL="${1:-http://localhost:5173/}"
OUT="${2:-/tmp}"
BIN="$(ls -d "$HOME"/Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-headless-shell-mac-arm64/chrome-headless-shell | tail -1)"
for spec in "desktop:1280,6400" "mobile:375,9000"; do
  name="${spec%%:*}"; size="${spec##*:}"
  "$BIN" --headless --disable-gpu --hide-scrollbars --window-size="$size" --virtual-time-budget=6000 \
    --screenshot="$OUT/landing-$name.png" "$URL" 2>/dev/null
  echo "$OUT/landing-$name.png"
done
