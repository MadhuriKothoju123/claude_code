#!/bin/bash
# Checks that a matching Jest test file exists/gets reviewed whenever a
# component, page, hook, or util is created or edited, per client/CLAUDE.md's
# folder structure + testing convention.

path=$(jq -r '.tool_input.file_path')

# .test. files are the tests themselves, never need a test of their own
echo "$path" | grep -q '.test.' && exit 0

if echo "$path" | grep -qE 'src/(components|pages)/.*\.(tsx|jsx)$'; then
  test_path=$(echo "$path" | sed -E 's/\.(tsx|jsx)$/.test.\1/')
elif echo "$path" | grep -qE 'src/(hooks|utils)/.*\.ts$'; then
  # index.ts barrels don't get their own test
  echo "$path" | grep -qE '/index\.ts$' && exit 0
  test_path=$(echo "$path" | sed -E 's/\.ts$/.test.ts/')
else
  exit 0
fi

if [ ! -f "$test_path" ]; then
  echo "No Jest test file found at $test_path — please create one now, matching this package's testing conventions in CLAUDE.md."
  exit 1
fi

echo "Reminder: $path was just modified. Review $test_path — update it if this change affects props, behavior, or rendering."
exit 1
