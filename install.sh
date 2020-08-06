#!/bin/bash

INSTALL_DIR="/opt/powerduck"
RELEASE="https://raw.githubusercontent.com/tomchaplin/powerduck/master/dist/powerduck.zip"
BIN_DIR="/usr/local/bin"

# Clean install directory
rm -r "$INSTALL_DIR"
# Make install directory
if [[ ! -d "$INSTALL_DIR" ]]; then
	mkdir "$INSTALL_DIR"
fi
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
