let
  stable = import <nixpkgs> { };
  unstable = import <nixos-unstable> { };
  node = stable.nodejs-18_x;
in
with stable; mkShell {
  name = "env";
  buildInputs = [
    azure-cli
    terraform
    azure-functions-core-tools
    nodePackages.typescript-language-server
    node
  ];
}
