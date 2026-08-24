#!/usr/bin/env bash
set -euo pipefail

# RED contract fixture: the runtime implementation is intentionally absent.
# This test must fail until ArgLearn V1 has an executable learning boundary.

test -f src/learning/engine.js
