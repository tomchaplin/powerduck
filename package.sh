#!/bin/bash
# Remove the old source
rm -r dist
# Remove old binaries
rm powerduck-linux powerduck-mac powerduck-win.exe
# Update the Neutralino binaries
neu update
# Build the project
neu build
# Release the project
neu release
# Copy in init script, powerduckling and desktopfile
cp init.sh powerduckling powerduck.desktop dist/powerduck-release/
# Move into dist directory
cd dist
# Delete the zip
rm powerduck-release.zip
# Delete windows and mac binaries
rm powerduck-release/powerduck-mac powerduck-release/powerduck-win.exe
# Make sure executable
chmod +x powerduck-release/powerduckling powerduck-release/powerduck-linux
# Zip up release
zip -r powerduck.zip powerduck-release
