#!/bin/bash

INSTALL_DIR="/opt/powerduck"
RELEASE="https://raw.githubusercontent.com/tomchaplin/powerduck/master/dist/powerduck.zip"
BIN_DIR="/usr/local/bin"

# Clean install directory
if [[ -d "$INSTALL_DIR" ]]; then
	rm -r "$INSTALL_DIR"
fi
# Make install directory
mkdir "$INSTALL_DIR"
# Get release
cd "$INSTALL_DIR"
curl "$RELEASE" --output powerduck.zip
unzip powerduck.zip
rm powerduck.zip
mv powerduck-release/* .
rm -r powerduck-release
# Initializse config files
bash "$INSTALL_DIR/init.sh"
# Install binary symlinks
ln -s "$INSTALL_DIR/powerduck-linux" "$BIN_DIR/powerduck"
ln -s "$INSTALL_DIR/powerduckling" "$BIN_DIR/powerduckling"
