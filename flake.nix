{
  description = "TypeScript + React + Vite dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22
          ];

          shellHook = ''
                        echo "⚡ Node $(node --version) | npm $(npm --version)"

                        # Install npm deps if node_modules is missing
                        if [ ! -d "node_modules" ]; then
                          echo "📦 Installing dependencies..."
                          npm install
                        fi

                        # ── Git hooks ──────────────────────────────────────────────
                        HOOKS_DIR=".git/hooks"
                        mkdir -p "$HOOKS_DIR"

                        # pre-commit: typecheck + lint
                        cat > "$HOOKS_DIR/pre-commit" << 'EOF'
            #!/usr/bin/env bash
            set -e
            echo "🔍 [pre-commit] Running type check..."
            npm run typecheck

            echo "🧹 [pre-commit] Running lint..."
            npm run lint

            echo "✅ [pre-commit] All checks passed."
            EOF
                        chmod +x "$HOOKS_DIR/pre-commit"

                        # pre-push: full build (acts as "pre-build" gate)
                        cat > "$HOOKS_DIR/pre-push" << 'EOF'
            #!/usr/bin/env bash
            set -e
            echo "🏗️  [pre-push] Running build..."
            npm run build

            echo "✅ [pre-push] Build succeeded."
            EOF
                        chmod +x "$HOOKS_DIR/pre-push"

                        echo "🪝 Git hooks installed (pre-commit, pre-push)"
          '';
        };
      }
    );
}
