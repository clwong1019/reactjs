cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-3dtouch.ThreeDeeTouch",
        "file": "plugins/cordova-plugin-3dtouch/www/ThreeDeeTouch.js",
        "pluginId": "cordova-plugin-3dtouch",
        "clobbers": [
            "ThreeDeeTouch"
        ]
    },
    {
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "id": "cordova-plugin-appavailability.AppAvailability",
        "file": "plugins/cordova-plugin-appavailability/www/AppAvailability.js",
        "pluginId": "cordova-plugin-appavailability",
        "clobbers": [
            "appAvailability"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-3dtouch": "1.3.5",
    "cordova-plugin-inappbrowser": "1.7.2",
    "cordova-plugin-appavailability": "0.4.2",
    "cordova-plugin-device": "1.1.7"
};
// BOTTOM OF METADATA
});
