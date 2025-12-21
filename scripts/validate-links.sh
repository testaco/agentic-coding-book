#!/bin/bash
# Validate markdown links

set -e

echo "Validating links..."

# Check if external link checking is enabled
CONFIG_FILE=".markdown-link-check.json"
if [ "$CHECK_EXTERNAL" = "true" ]; then
  echo "Checking internal AND external links..."
else
  echo "Checking internal links only..."
fi

# Run markdown-link-check on all .md files
find book -name "*.md" -print0 | while IFS= read -r -d '' file; do
  echo "Checking $file..."
  npx markdown-link-check "$file" --config "$CONFIG_FILE" --quiet
done

echo "✓ Link validation complete"
