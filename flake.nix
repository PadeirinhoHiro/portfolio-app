{
  description = "TypeScript + React + Vite dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    git-hooks.url = "github:cachix/git-hooks.nix";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      git-hooks,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        checks = {
          pre-commit-check = git-hooks.lib.${system}.run {
            src = ./.;
            hooks = {
              typecheck = {
                enable = true;
                name = "Type check";
                entry = "npm run typecheck";
                language = "system";
                pass_filenames = false;
                stages = [ "pre-commit" ];
              };

              lint = {
                enable = true;
                name = "Lint";
                entry = "npm run lint";
                language = "system";
                pass_filenames = false;
                stages = [ "pre-commit" ];
              };

              build = {
                enable = true;
                name = "Build";
                entry = "npm run build";
                language = "system";
                pass_filenames = false;
                stages = [ "pre-push" ];
              };
            };
          };
        };

        devShells.default = pkgs.mkShell {
          buildInputs = self.checks.${system}.pre-commit-check.enabledPackages ++ [ pkgs.nodejs_22 ];
          shellHook = ''
            echo "⚡ Node $(node --version) | npm $(npm --version)"
            if [ ! -d "node_modules" ]; then
              echo "📦 Installing dependencies..."
              npm install
            fi
            ${self.checks.${system}.pre-commit-check.shellHook}
          '';
        };
      }
    );
}
