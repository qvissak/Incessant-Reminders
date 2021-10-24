# Incessant-Reminders

Google Chrome extension to remind you of anything for any interval of time. This extension is perfect if you want to be given gentle reminders of little things to aid in the completion of your goals.

[![Build Status](https://travis-ci.org/qvissak/Incessant-Reminders.svg?branch=master)](https://travis-ci.org/qvissak/Incessant-Reminders)
[![Maintainability](https://api.codeclimate.com/v1/badges/7ab50c695ee2e7ef4027/maintainability)](https://codeclimate.com/github/qvissak/Incessant-Reminders/maintainability)

## Set up

After completing these steps, navigate to your [chrome extensions settings](chrome://extensions/) and enable developer mode. Select `Load unpacked` and select this folder: `Incessant-Reminders/build/`.

```sh
git clone https://github.com/qvissak/Incessant-Reminders.git
cd Incessant-Reminders/
brew bundle
npm install
npm run build
```

## Update npm Packages

```sh
ncu --upgrade
npm i
```

## Release

After completing these steps, navigate to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard), log in, and publish the extension using `build.zip`.

```sh
npm run release
```
