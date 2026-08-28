---
id: "2026-07-27"
title: "ESP-IDF VS Code Setup Tutorial"
description: "This tutorial covers how to setup VS Code for ESP-IDF development in Windows."
updated: "2026-08-28"
draft: true
tags: ["esp32", "esp-idf", "vscode"]
---

This is a step-by-step tutorial that explains how you can set up your development environment for working with ESP-IDF projects. We use VS Code as our code editor.

## Install ESP-IDF

Espressif Systems provides a graphical tool called **EIM (ESP-IDF Installation Manager)** to install ESP-IDF. Click the link below to go to the official page to download EIM:

<https://dl.espressif.com/dl/eim/>

Make sure you are in the "Online Installer" tab. The exact file to download depends on your system:

- Windows: Download `eim-gui-windows-x64.exe`. Run this installer to install EIM.
- Linux x64 (Ubuntu): Download and install the `.deb` package (`eim-gui-linux-x64.deb`).

Now that we have installed EIM, let's install ESP-IDF using it.

1. Open EIM.
2. Under "New Installation" click "Start Installation".
3. Under "Easy Installation", click "Start Easy Installation" to install the latest stable version of ESP-IDF with default settings.
4. If there are no problems, you will see the "Ready to Install" page. Click "Start Installation".

## Install ESP-IDF VS Code Extension

We use this extension as a high-level wrapper for ESP-IDF. Most times, we do not use ESP-IDF directly. For example, if we need to compile our source code, we ask the extension to do it, which uses the ESP-IDF we just installed internally to to compile the source code.

Install the extension named "ESP-IDF" by "Espressif Systems". After installing, restart VS Code. Use the shortcut `Ctrl + Shift + P` to open the command palette (remember this shortcut, we are going to use it a lot). Inside the command palette, search `ESP-IDF`. You will see many entries which start with `ESP-IDF:`. Those commands are provided my the ESP-IDF extension. These commands are what we use for almost everything.

## Creating a New Project

Like I said before, we are going to use the `ESP-IDF: New Project` command from the command palette to create the project. Press `Ctrl + Shift + P` to open the command palette.

- From the command palette, select `ESP-IDF: New Project`, and wait.
- Select your ESP-IDF version (you might see only one version since we only installed one), and wait.
- A new tab will pop up. Inside that tab, under `ESP-IDF Templates` select the `sample_project` template and click the "Create Project" button.

The tab will refresh, and you will see a form to fill in your project details. Fill in the details:

- Project name: Your project name.
- Project directory: Your project directory.
- ESP-IDF target: esp32.
- ESP-IDF board: Custom board.
- Serial port: Detect.
- OpenOCD configuration files: Keep the default value.
- ESP-IDF component directory: Keep the input empty.

Click "Create Project" and wait. After creation, click "Open Project". This will open your brand new ESP-IDF project in a fresh VS Code window.

> If you are prompted to generate `compile_commands.json`, accept it. If not, or you mistakenly clicked "Decline", do `Ctrl + Shift + P -> ESP-IDF: Run idf.py reconfigure Task`, which does the same thing.

> If you are using Clangd in VS Code or its forks, run `ESP-IDF: Configure project for ESP-Clang` from the VS Code command palette to make sure Clangd IntelliSense works correctly.

## 2. Configure, build & flash

1. `Ctrl + Shift + P -> ESP-IDF: Run idf.py reconfigure Task`
2. `Ctrl + Shift + P -> ESP-IDF: Build Your Project`
3. `Ctrl + Shift + P -> ESP-IDF: Flash (UART) Your Project`

### A Note for Windows users (skip this if you use Linux)

If you are on Windows, flashing might show this error:

```plaintext
A fatal error occurred: Could not connect to an Espressif device on any of the 1 available serial ports.
```

If that happens, the next time you try, press and hold the BOOT button on your board as soon as
you see `Connecting...`. Only stop pressing after a few seconds.

### A Note for Linux users (skip this if you use Windows)

You might get this error while flashing:

```
A fatal error occurred: Could not open /dev/ttyUSB0, the port is busy or doesn't exist.
([Errno 13] could not open port /dev/ttyUSB0: [Errno 13] Permission denied: '/dev/ttyUSB0')

Hint: Try to add user into dialout or uucp group.
```

If that happens, run this command, log out, log back in (or reboot), and try flashing again:

```bash
sudo usermod -aG dialout $USER
```

You have to do it only once.

## Troubleshooting

### Red squiggly lines under `#include "something"`

Try both. At least one of them will probably work.

- Option 1: `Ctrl + Shift + P -> ESP-IDF: Run idf.py reconfigure Task`
- Option 2: `Ctrl + Shift + P -> Add VS Code Configuration Folder`

### Reconfigure or build failure

Delete the `build` directory and try again.

## Tips

### Using `idf.py`

`Ctrl + Shift + P -> Open ESP-IDF Terminal`. You can use `idf.py` in this terminal (e.g., `idf.py reconfigure`).
