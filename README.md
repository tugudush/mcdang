McDang Demo - ShiftLeft - 2017

## Ionic 3 Platform installation

Install [Ionic](http://ionicframework.com/docs/) first. Note that Cordova needs to be installed as well. 
```bash
$ sudo npm install -g ionic cordova
```

## Installation

After cloning, install with
```bash
$ npm install
```
To build the apk for android:
```bash
$ ionic cordova build android [--prod --release]
$ adb devices (to check device is connected)
$ adb install platforms/android/build/outputs/apk/mcdang_v*_*.apk
```
To run straight on the android device:
```bash
$ adb devices (to check device is connected)
$ ionic cordova run android [--prod --release]
```

## Usage

Only works on device. The Cordova plugins don't work in browser 
(doing `ionic serve`).

## Beta Version History

### Beta v1.4
* Fix video full-screen bug on ios
* Register app on ios
* Preliminary testing on ios mini ipad

### Beta v1.3
* 'Loading' message replaced with Toast. Only indicate when video is loaded.

### Beta v1.2
* 'Loading' message to indicate video is loading while on the recipe page.
* Catch android back button, prompting for exit. Encourages to use swipe and avoids navigation error.
* Handle exit for ios to ensure that the app closes.

### Beta v1.1
* Lazy Loading: Load pages on demand for faster startup. Note, this doesn't affect the video streaming which is entirely
      dependent on your network access speed.
* Add __Video Ready__ message, mainly for debugging purposes.

### Beta v1.0
* Update styling
* Add __RESTART__ button on VideoPage
* Highlight current instruction on InstructionsPage
* Extend splash display duration untill app starts
* Debug Synchronisation between VideoPage and InstructionsPage
* New icon

 

