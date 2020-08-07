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
# Copy in powerduckling, desktop and service file
cp powerduckling powerduck.desktop powerduck.service dist/powerduck-release/
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
