# Powerduck

A graphical interface on top of `liquidctl` for controlling the lighting and cooling of your PC.
At the moment, very much hard coded for a single PC.

## Prerequisites

* Python 3
* `liqudictl`

## Installation

There are a few tasks that need to be run to install the compiled app:

* Download the zip and extract to the install directory `/opt/powerduck/`
* Run the init script to ensure config files are stup
* Install the service file to enable default profiles on startup
* Install the desktop file
* Add symlinks for `powerduck` and `powerduckling` binaries
* Remove the zip

This will be handled by an install script soon

## Building

As well as `npm`, you will need the `neu-cli` which you can [download here](https://neutralino.js.org/docs/#/tools/cli).
Then simply clone the project and run
```
npm install
neu update
neu build
./init.sh
```
You can then run the project with
```
neu run
```

## Packaging

Packaging is handled by `package.sh`
