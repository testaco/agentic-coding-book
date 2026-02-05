{
  description = "The Agentic Coding Playbook: From Idea to Production in 6 Weeks";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";

    # Devbox base platform - provides git, gh, claude, aws, shell tools, etc.
    devbox.url = "github:testaco/devbox?dir=base-flake";
  };

  outputs = { self, nixpkgs, flake-utils, devbox }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };

        # Node.js dependencies (installed via npm in shell hook)
        nodejs = pkgs.nodejs_20;

        # Python with required packages
        python = pkgs.python3.withPackages (ps: with ps; [
          pyyaml
        ]);

        # TeXLive with XeLaTeX and required packages for Pandoc PDF generation
        # Using scheme-medium which includes most common packages needed for Pandoc
        texlive = pkgs.texlive.combine {
          inherit (pkgs.texlive) scheme-medium
            # Additional packages for XeLaTeX and Pandoc
            xetex
            fontspec
            unicode-math
            polyglossia
            # Document structure and formatting
            geometry
            hyperref
            xcolor
            listings
            fancyhdr
            titlesec
            tocloft
            # Typography and layout
            parskip
            setspace
            caption
            float
            # Additional utilities
            l3packages
            xkeyval
            etoolbox
            booktabs
            upquote
            fontawesome5
          ;
        };

        # Build scripts
        buildScripts = pkgs.stdenv.mkDerivation {
          name = "agentic-coding-book-scripts";
          src = ./.;

          buildInputs = [
            nodejs
            pkgs.pandoc
            texlive
            python
            pkgs.bash
            pkgs.coreutils
            pkgs.findutils
            pkgs.gnused
            pkgs.gawk
          ];

          buildPhase = ''
            # Install npm dependencies
            npm ci --prefer-offline --no-audit
          '';

          installPhase = ''
            mkdir -p $out/bin
            # Copy scripts
            cp -r scripts $out/
            cp -r book $out/
            cp -r diagrams $out/
            cp package.json package-lock.json $out/
            cp -r node_modules $out/

            # Create wrapper scripts
            cat > $out/bin/build-pdf <<'EOF'
            #!/usr/bin/env bash
            cd $out && bash $out/scripts/build-pdf.sh
            EOF
            chmod +x $out/bin/build-pdf

            cat > $out/bin/validate <<'EOF'
            #!/usr/bin/env bash
            cd $out && bash $out/scripts/validate.sh
            EOF
            chmod +x $out/bin/validate
          '';
        };

      in
      {
        # Development shell
        devShells.default = pkgs.mkShell {
          name = "agentic-coding-book-dev";

          # Inherit all base platform tools from devbox (git, gh, claude, aws, jq, etc.)
          inputsFrom = [
            devbox.devShells.${system}.default
          ];

          buildInputs = [
            # Core build tools
            nodejs
            pkgs.pandoc
            texlive
            python

            # Chromium for Mermaid diagram rendering (Puppeteer)
            pkgs.chromium

            # Shell utilities for scripts
            pkgs.bash
            pkgs.coreutils
            pkgs.findutils
            pkgs.gnused
            pkgs.gawk
            pkgs.which

            # Optional but useful
            pkgs.gnumake
          ];

          shellHook = ''
            # Configure Puppeteer to use Nix-provided Chromium
            export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
            export PUPPETEER_EXECUTABLE_PATH="${pkgs.chromium}/bin/chromium"
            # Disable sandboxing for Chromium in containers/Nix environments
            export PUPPETEER_ARGS="--no-sandbox --disable-setuid-sandbox"

            echo "Agentic Coding Book Development Environment"
            echo "============================================"
            echo ""
            echo "Base platform tools inherited from devbox:"
            echo "  git, gh, claude, aws, jq, vim, shellcheck, etc."
            echo ""
            echo "Project-specific tools:"
            echo "  Node.js: $(node --version)"
            echo "  Pandoc: $(pandoc --version | head -1)"
            echo "  Python: $(python --version)"
            echo "  TeX Live: $(xelatex --version | head -1)"
            echo "  Chromium: $(chromium --version)"
            echo ""
            echo "Available commands:"
            echo "  npm install          - Install Node.js dependencies"
            echo "  npm run build:pdf    - Build PDF book"
            echo "  npm run validate     - Run all validation checks"
            echo "  npm run validate:links - Validate links"
            echo "  npm run build:mermaid - Render Mermaid diagrams"
            echo "  npm test             - Run tests"
            echo ""

            # Install npm dependencies if not already installed
            if [ ! -d "node_modules" ]; then
              echo "Installing npm dependencies..."
              npm install
            fi

            echo "Ready to build!"
            echo "============================================"
          '';

          # Environment variables
          PROJECT_ROOT = builtins.toString ./.;

          # Ensure scripts can find node_modules/.bin
          shellPath = "${nodejs}/bin:$PATH";
        };

        # Applications that can be run with `nix run`
        apps = {
          # Build PDF: nix run .#build-pdf
          build-pdf = flake-utils.lib.mkApp {
            drv = pkgs.writeShellScriptBin "build-pdf" ''
              export PATH="${nodejs}/bin:${pkgs.pandoc}/bin:${texlive}/bin:${python}/bin:${pkgs.bash}/bin:${pkgs.coreutils}/bin:${pkgs.findutils}/bin:${pkgs.gnused}/bin:${pkgs.gawk}/bin:$PATH"

              if [ ! -d "node_modules" ]; then
                echo "Installing dependencies..."
                npm install
              fi

              bash scripts/build-pdf.sh "$@"
            '';
          };

          # Validate: nix run .#validate
          validate = flake-utils.lib.mkApp {
            drv = pkgs.writeShellScriptBin "validate" ''
              export PATH="${nodejs}/bin:${python}/bin:${pkgs.chromium}/bin:${pkgs.bash}/bin:${pkgs.coreutils}/bin:$PATH"
              export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
              export PUPPETEER_EXECUTABLE_PATH="${pkgs.chromium}/bin/chromium"

              if [ ! -d "node_modules" ]; then
                echo "Installing dependencies..."
                npm install
              fi

              bash scripts/validate.sh
            '';
          };

          # Validate links: nix run .#validate-links
          validate-links = flake-utils.lib.mkApp {
            drv = pkgs.writeShellScriptBin "validate-links" ''
              export PATH="${nodejs}/bin:${pkgs.bash}/bin:${pkgs.coreutils}/bin:$PATH"

              if [ ! -d "node_modules" ]; then
                echo "Installing dependencies..."
                npm install
              fi

              bash scripts/validate-links.sh
            '';
          };

          # Build Mermaid diagrams: nix run .#build-mermaid
          build-mermaid = flake-utils.lib.mkApp {
            drv = pkgs.writeShellScriptBin "build-mermaid" ''
              export PATH="${nodejs}/bin:${pkgs.chromium}/bin:${pkgs.coreutils}/bin:$PATH"
              export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
              export PUPPETEER_EXECUTABLE_PATH="${pkgs.chromium}/bin/chromium"

              if [ ! -d "node_modules" ]; then
                echo "Installing dependencies..."
                npm install
              fi

              node scripts/render-mermaid.js
            '';
          };
        };

        # Default app
        apps.default = self.apps.${system}.build-pdf;

        # Package for the book (builds PDF)
        packages.default = pkgs.stdenv.mkDerivation {
          name = "agentic-coding-book";
          version = "0.1.0";

          src = ./.;

          nativeBuildInputs = [
            nodejs
            pkgs.pandoc
            texlive
            python
            pkgs.chromium
          ];

          buildPhase = ''
            export HOME=$TMPDIR

            # Configure Puppeteer to use Nix-provided Chromium
            export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1
            export PUPPETEER_EXECUTABLE_PATH="${pkgs.chromium}/bin/chromium"

            # Install npm dependencies
            npm ci --prefer-offline --no-audit

            # Render Mermaid diagrams
            npm run build:mermaid

            # Build PDF
            bash scripts/build-pdf.sh
          '';

          installPhase = ''
            mkdir -p $out
            cp output/agentic-coding-book.pdf $out/
          '';

          meta = with pkgs.lib; {
            description = "The Agentic Coding Playbook: From Idea to Production in 6 Weeks";
            license = licenses.cc-by-40;
            platforms = platforms.unix;
          };
        };
      }
    );
}
