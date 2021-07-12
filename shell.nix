{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
    nodePackages.prettier
    nodePackages.typescript-language-server
    nodejs
  ];

  PATH="${pkgs.nodePackages.typescript-language-server}/bin:${pkgs.nodePackages.prettier}/bin:$PATH";
}
