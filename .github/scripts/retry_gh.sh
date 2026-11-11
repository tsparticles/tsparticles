#!/usr/bin/env bash
# Shared helper for GitHub release steps.
# Source this file, then call: retry_gh <gh command and args...>
#
# Environment variables (with defaults):
#   RELEASE_UPLOAD_RETRIES    – max number of attempts   (default: 6)
#   RELEASE_RETRY_BASE_DELAY  – base delay in seconds    (default: 10)
#
# The backoff is exponential: delay = BASE * 2^(attempt-1)
#   attempt 1 → 10 s
#   attempt 2 → 20 s
#   attempt 3 → 40 s
#   attempt 4 → 80 s
#   attempt 5 → 160 s

retry_gh() {
  local attempt=1
  local max="${RELEASE_UPLOAD_RETRIES:-6}"
  local base="${RELEASE_RETRY_BASE_DELAY:-10}"

  while true; do
    if "$@"; then
      return 0
    fi

    if [[ "$attempt" -ge "$max" ]]; then
      echo "::error::Command failed after ${max} attempts: $*" >&2
      return 1
    fi

    local sleep_seconds=$(( base * (2 ** (attempt - 1)) ))
    echo "Attempt ${attempt}/${max} failed. Waiting ${sleep_seconds}s before retry..." >&2
    sleep "$sleep_seconds"
    attempt=$(( attempt + 1 ))
  done
}

