# Powerduck

A graphical interface on top of `liquidctl` for controlling the lighting and cooling of your PC.
At the moment, very much hard coded for a single PC.

## Prerequisites

* Python 3
* `liqudictl`

## Installation

The install script `install.sh` will do everything for you, you may wish to inspect it for security reasons.
To download and install the script just run
```
curl https://raw.githubusercontent.com/tomchaplin/powerduck/master/install.sh | bash
```

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
