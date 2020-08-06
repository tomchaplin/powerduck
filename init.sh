#!/bin/bash
CONFIG_FOLDER="$HOME/.config/powerduck"
POWERDUCK_CONFIG="$CONFIG_FOLDER/powerduck.json"
ACTIVE_PROFILES="$CONFIG_FOLDER/activeProfiles.json"
if [[ ! -d "$HOME/.config" ]]; then
	mkdir "$HOME/.config"
fi
if [[ ! -d "$CONFIG_FOLDER" ]]; then
	mkdir "$CONFIG_FOLDER"
fi
if [[ ! -f "$POWERDUCK_CONFIG" ]]; then
	printf "{}" > $POWERDUCK_CONFIG
fi
if [[ ! -f "$ACTIVE_PROFILES" ]]; then
	printf "{}" > $ACTIVE_PROFILES
fi
