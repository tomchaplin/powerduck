#!/bin/bash

INSTALL_DIR="/opt/powerduck"
RELEASE="https://raw.githubusercontent.com/tomchaplin/powerduck/master/dist/powerduck.zip"
BIN_DIR="/usr/local/bin"

# Remove old symlinks
sudo unlink "$BIN_DIR/powerduck"
sudo unlink "$BIN_DIR/powerduckling"
# Clean install directory
if [[ -d "$INSTALL_DIR" ]]; then
	rm -r "$INSTALL_DIR"
fi
# Make install directory
sudo mkdir "$INSTALL_DIR"
# Get release
cd "$INSTALL_DIR"
sudo curl "$RELEASE" --output powerduck.zip
sudo unzip powerduck.zip
sudo rm powerduck.zip
sudo mv powerduck-release/* .
sudo rm -r powerduck-release
# Initializse config files
bash "$INSTALL_DIR/init.sh"
# Install binary symlinks
sudo ln -s "$INSTALL_DIR/powerduck-linux" "$BIN_DIR/powerduck"
sudo ln -s "$INSTALL_DIR/powerduckling" "$BIN_DIR/powerduckling"
