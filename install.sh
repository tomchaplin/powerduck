#!/bin/bash

INSTALL_DIR="/opt/powerduck"
RELEASE="https://raw.githubusercontent.com/tomchaplin/powerduck/master/dist/powerduck.zip"
BIN_DIR="/usr/local/bin"
USER="$(whoami)"

# Remove old symlinks
sudo unlink "$BIN_DIR/powerduck"
sudo unlink "$BIN_DIR/powerduckling"
# Clean install directory
if [[ -d "$INSTALL_DIR" ]]; then
	sudo rm -r "$INSTALL_DIR"
fi
# Make install directory
sudo mkdir "$INSTALL_DIR"
sudo chown -R "$USER" "$INSTALL_DIR"
# Get release
cd "$INSTALL_DIR"
curl "$RELEASE" --output powerduck.zip
unzip powerduck.zip
rm powerduck.zip
mv powerduck-release/* .
rm -r powerduck-release
echo "(cd $INSTALL_DIR && exec $INSTALL_DIR/powerduck-linux)" > "$INSTALL_DIR/powerduck"
chmod +x "$INSTALL_DIR/powerduck"
# Initializse config files
bash "$INSTALL_DIR/init.sh"
# Install binary symlinks
sudo ln -s "$INSTALL_DIR/powerduck" "$BIN_DIR/powerduck"
sudo ln -s "$INSTALL_DIR/powerduckling" "$BIN_DIR/powerduckling"
