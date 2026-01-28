# Nix Flake Usage Guide

This project includes a Nix flake for reproducible development environments and builds.

## Quick Start

### Option 1: One-time Use (no installation)

Build the PDF without installing anything permanently:

```bash
nix run github:testaco/agentic-coding-book#build-pdf
```

Enter the development shell:

```bash
nix develop
```

### Option 2: Automatic Environment (with direnv)

If you have direnv installed and enabled:

```bash
# Allow direnv to load the environment
direnv allow

# The environment will automatically activate when you cd into the directory
```

### Option 3: Manual Flake Development Shell

Enter the development environment manually:

```bash
nix develop

# All dependencies will be available:
# - Node.js 20
# - Pandoc 3.x
# - Python 3 with PyYAML
# - TeX Live with XeLaTeX
# - Build scripts and utilities
```

## Available Nix Commands

### Build Commands

```bash
# Build the PDF
nix run .#build-pdf

# Validate all content
nix run .#validate

# Validate links only
nix run .#validate-links

# Render Mermaid diagrams
nix run .#build-mermaid
```

### Build the Book Package

Build the complete book as a Nix package:

```bash
nix build

# Output will be in ./result/agentic-coding-book.pdf
```

### Update Flake Dependencies

Update all flake inputs to their latest versions:

```bash
nix flake update
```

## What's Included

The Nix flake provides:

### Development Shell (`nix develop`)

- **Node.js 20** - JavaScript runtime for build tools
- **Pandoc 3.x** - Document converter for PDF generation
- **TeX Live with XeLaTeX** - LaTeX distribution for PDF typesetting
- **Python 3 with PyYAML** - For validation scripts
- **Git** - Version control
- **Build utilities** - bash, coreutils, findutils, sed, awk

### Applications (`nix run`)

- `build-pdf` - Generate the PDF book
- `validate` - Run all validation checks
- `validate-links` - Check for broken links
- `build-mermaid` - Render Mermaid diagrams

### Packages (`nix build`)

- `default` - Complete book build (outputs PDF)

## Benefits of Using Nix

1. **Reproducible Builds** - Same output on any machine
2. **No System Pollution** - Dependencies are isolated
3. **Version Pinning** - Exact versions locked in flake.lock
4. **Easy Onboarding** - One command to get started
5. **CI/CD Ready** - Same environment locally and in CI

## Requirements

### Install Nix

If you don't have Nix installed:

```bash
# Install Nix (multi-user, recommended)
sh <(curl -L https://nixos.org/nix/install) --daemon

# Enable flakes (add to ~/.config/nix/nix.conf or /etc/nix/nix.conf)
experimental-features = nix-command flakes
```

### Install direnv (Optional)

For automatic environment activation:

```bash
# On NixOS
nix-env -iA nixpkgs.direnv

# On macOS with Homebrew
brew install direnv

# Add to your shell profile (.bashrc, .zshrc, etc.)
eval "$(direnv hook bash)"   # for bash
eval "$(direnv hook zsh)"    # for zsh
```

## Troubleshooting

### Cache Misses

If builds are slow, add the Nix community cache:

```bash
# Add to ~/.config/nix/nix.conf or /etc/nix/nix.conf
substituters = https://cache.nixos.org https://nix-community.cachix.org
trusted-public-keys = cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY= nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs=
```

### npm install Failures

The flake will automatically run `npm install` when needed. If you encounter issues:

```bash
# Clear npm cache
rm -rf node_modules package-lock.json
nix develop
npm install
```

### TeX Live Package Missing

If PDF generation fails due to missing LaTeX packages, add them to `flake.nix`:

```nix
texlive = pkgs.texlive.combine {
  inherit (pkgs.texlive) scheme-basic
    # ... existing packages ...
    your-missing-package
  ;
};
```

Then rebuild:

```bash
nix flake lock --update-input nixpkgs
nix develop
```

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Build PDF with Nix
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: cachix/install-nix-action@v20
        with:
          extra_nix_config: |
            experimental-features = nix-command flakes
      - name: Build PDF
        run: nix build
      - name: Upload PDF
        uses: actions/upload-artifact@v3
        with:
          name: book-pdf
          path: result/agentic-coding-book.pdf
```

## Comparison: npm vs Nix

| Task | npm/Traditional | Nix Flake |
|------|----------------|-----------|
| Install deps | `npm install` | `nix develop` |
| Build PDF | `npm run build:pdf` | `nix run .#build-pdf` |
| Validate | `npm test` | `nix run .#validate` |
| System deps | Manual install | Automatic |
| Reproducibility | ⚠️ Platform-dependent | ✅ Guaranteed |
| Isolation | ⚠️ System-wide | ✅ Full isolation |

## Recommended Workflow

1. **Initial Setup**
   ```bash
   git clone <repo>
   cd agentic-coding-book
   nix develop  # or use direnv
   ```

2. **Daily Development**
   ```bash
   # Environment auto-loads with direnv
   npm run build:pdf    # Use familiar npm commands
   npm test
   ```

3. **Clean Builds**
   ```bash
   nix build  # Reproducible build from scratch
   ```

4. **CI/CD**
   ```yaml
   # Use nix in CI for guaranteed reproducibility
   - run: nix build
   ```

## Further Reading

- [Nix Flakes Documentation](https://nixos.wiki/wiki/Flakes)
- [Nix Pills](https://nixos.org/guides/nix-pills/) - Learn Nix in depth
- [Zero to Nix](https://zero-to-nix.com/) - Beginner-friendly guide
- [direnv Documentation](https://direnv.net/)

## Support

For issues specific to the Nix setup, please open an issue on GitHub with the `nix` label.
