# Powerduck

A graphical interface on top of `liquidctl` for controlling the lighting and cooling of your PC.
At the moment, very much hard coded for a single PC.

## Prerequisites

* Python 3
* `liqudictl`

## Installation

You just need to download the install script, make it executable and run it
```
curl https://raw.githubusercontent.com/tomchaplin/powerduck/master/install.sh --output powerduck-install.sh
chmod +x powerduck-install.sh
sudo --preserve-env=HOME ./powerduck-install.sh
rm powerduck-install.sh
```
Note the `--preserve-env` is important so that the config files get initialised in your home directory

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
