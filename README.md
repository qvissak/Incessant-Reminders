# Incessant-Reminders
Google Chrome extension to remind you of anything for any interval of time. This extension is perfect if you want to be given gentle reminders of little things to aid in the completion of your goals.

## Set up
After completing these steps, navigate to your [chrome extensions settings](chrome://extensions/) and enable developer mode. Select `load unpacked extension...` and select this folder: `Incessant-Reminders/build/`.
```sh
brew bundle
git clone git@github.com:qvissak/Incessant-Reminders.git
cd Incessant-Reminders/
npm install
npm run build
```

## Release
After completing these steps, navigate to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard), log in, and publish the extension using `build.zip`.
```sh
npm run release
```
