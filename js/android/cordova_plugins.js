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
        "id": "cordova-plugin-appavailability.AppAvailability",
        "file": "plugins/cordova-plugin-appavailability/www/AppAvailability.js",
        "pluginId": "cordova-plugin-appavailability",
        "clobbers": [
            "appAvailability"
        ]
    },    
    {
        "id": "ionic-plugin-keyboard.keyboard",
        "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
        "pluginId": "ionic-plugin-keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    },
    {
        "id": "cordova-plugin-cncbi-nnl.sample",
        "file": "plugins/cordova-plugin-cncbi-nnl/www/nnl.js",
        "pluginId": "cordova-plugin-cncbi-nnl",
        "clobbers": [
            "nnl"
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
        "id": "cordova-plugin-mfp.mfp",
        "file": "plugins/cordova-plugin-mfp/bootstrap.js",
        "pluginId": "cordova-plugin-mfp",
        "runs": true
    },
    {
        "id": "cordova-plugin-globalization.GlobalizationError",
        "file": "plugins/cordova-plugin-globalization/www/GlobalizationError.js",
        "pluginId": "cordova-plugin-globalization",
        "clobbers": [
            "window.GlobalizationError"
        ]
    },
    {
        "id": "cordova-plugin-globalization.globalization",
        "file": "plugins/cordova-plugin-globalization/www/globalization.js",
        "pluginId": "cordova-plugin-globalization",
        "clobbers": [
            "navigator.globalization"
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
        "id": "cordova-plugin-mfp-jsonstore.jsonstore",
        "file": "plugins/cordova-plugin-mfp-jsonstore/bootstrap.js",
        "pluginId": "cordova-plugin-mfp-jsonstore",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-cncbi-nnl": "0.0.1",
    "cordova-plugin-inappbrowser": "1.7.2",
    "cordova-plugin-device": "1.1.7",
    "cordova-plugin-globalization": "1.0.8",
    "cordova-plugin-mfp": "8.0.2017102403",
    "cordova-plugin-mfp-jsonstore": "8.0.2017090705",
};
// BOTTOM OF METADATA
});
