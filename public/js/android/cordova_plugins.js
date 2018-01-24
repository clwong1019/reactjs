cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
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
        "id": "cordova-plugin-qrscanner.QRScanner",
        "file": "plugins/cordova-plugin-qrscanner/www/www.min.js",
        "pluginId": "cordova-plugin-qrscanner",
        "clobbers": [
            "QRScanner"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-network-information.network",
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "cordova-plugin-network-information.Connection",
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "id": "cordova-plugin-appversion.RareloopAppVersion",
        "file": "plugins/cordova-plugin-appversion/www/app-version.js",
        "pluginId": "cordova-plugin-appversion",
        "clobbers": [
            "AppVersion"
        ]
    },
    {
        "id": "com.cordova.plugins.cookiemaster.cookieMaster",
        "file": "plugins/com.cordova.plugins.cookiemaster/www/cookieMaster.js",
        "pluginId": "com.cordova.plugins.cookiemaster",
        "clobbers": [
            "cookieMaster"
        ]
    },
    {
        "id": "cordova-plugin-android-fingerprint-auth.FingerprintAuth",
        "file": "plugins/cordova-plugin-android-fingerprint-auth/www/FingerprintAuth.js",
        "pluginId": "cordova-plugin-android-fingerprint-auth",
        "clobbers": [
            "FingerprintAuth"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-compat": "1.2.0",
    "cordova-plugin-inappbrowser": "2.0.1",
    "cordova-plugin-qrscanner": "2.5.0",
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-device": "2.0.1",
    "cordova-plugin-network-information": "2.0.1",
    "cordova-plugin-appversion": "1.0.0",
    "com.cordova.plugins.cookiemaster": "1.0.0",
    "cordova-plugin-android-fingerprint-auth": "1.4.1"
};
// BOTTOM OF METADATA
});