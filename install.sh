#!/bin/bash

STARTER='🤖\033[1;36m ===> \033[1;35m'
ENDER='\033[0m\n'

robot_say() {
	printf "${STARTER}$@${ENDER}"
}

INSTALL_DIR="/opt/powerduck"
RELEASE="https://raw.githubusercontent.com/tomchaplin/powerduck/master/dist/powerduck.zip"
BIN_DIR="/usr/local/bin"
DESKTOP_DIR="${HOME}/.local/share/applications"
USER="$(whoami)"
CONFIG_FOLDER="$HOME/.config/powerduck"
POWERDUCK_CONFIG="$CONFIG_FOLDER/powerduck.json"
ACTIVE_PROFILES="$CONFIG_FOLDER/activeProfiles.json"
USER_SERVICES="/etc/systemd/user"
ICON_DIR="$HOME/.icons"

# Remove old symlinks
robot_say "Removing old programs"
sudo unlink "$BIN_DIR/powerduck"
sudo unlink "$BIN_DIR/powerduckling"
sudo unlink "$BIN_DIR/idleduck"
# Clean install directory
if [[ -d "$INSTALL_DIR" ]]; then
	robot_say "Cleaning old install directory"
	sudo rm -r "$INSTALL_DIR"
fi
# Make install directory
robot_say "Seting up install directory"
sudo mkdir -p "$INSTALL_DIR"
sudo chown -R "$USER" "$INSTALL_DIR"
# Get release
robot_say "Downloading latest release"
cd "$INSTALL_DIR"
curl "$RELEASE" --output powerduck.zip
unzip powerduck.zip
rm powerduck.zip
mv powerduck-release/* .
rm -r powerduck-release
echo "(cd $INSTALL_DIR && exec $INSTALL_DIR/powerduck-linux)" > "$INSTALL_DIR/powerduck"
chmod +x "$INSTALL_DIR/powerduck"
# Initializse config files
robot_say "Initialising config files"
if [[ ! -d "$CONFIG_FOLDER" ]]; then
	mkdir -p "$CONFIG_FOLDER"
fi
if [[ ! -f "$POWERDUCK_CONFIG" ]]; then
	printf "{}" > $POWERDUCK_CONFIG
fi
if [[ ! -f "$ACTIVE_PROFILES" ]]; then
	printf "{}" > $ACTIVE_PROFILES
fi
# Install binary symlinks
robot_say "Installing new programs"
sudo ln -s "$INSTALL_DIR/powerduck" "$BIN_DIR/powerduck"
sudo ln -s "$INSTALL_DIR/powerduckling" "$BIN_DIR/powerduckling"
sudo ln -s "$INSTALL_DIR/idleduck" "$BIN_DIR/idleduck"
# Install desktop entry
robot_say "Setting up desktop entry"
if [[ ! -d "$DESKTOP_DIR" ]]; then
	mkdir -p "$DESKTOP_DIR"
fi
cp "$INSTALL_DIR/powerduck.desktop" "$DESKTOP_DIR/powerduck.desktop"
# Install service file
robot_say "Installing startup service file"
if [[ ! -d "$USER_SERVICES" ]]; then
	sudo mkdir -p "$USER_SERVICES"
fi
sudo cp "$INSTALL_DIR/powerduck.service" "$USER_SERVICES/powerduck.service"
sudo cp "$INSTALL_DIR/idleduck.service" "$USER_SERVICES/idleduck.service"
systemctl --user enable powerduck
systemctl --user enable idleduck
# Install icon
robot_say "Installing icon file"
if [[ ! -d "$ICON_DIR" ]]; then
	mkdir -p "$ICON_DIR"
fi
if [[ -f "$ICON_DIR/powerduck.png" ]]; then
	rm "$ICON_DIR/powerduck.png"
fi
cp "$INSTALL_DIR/powerduck.png" "$ICON_DIR/powerduck.png"
# All done
robot_say "All done!"
