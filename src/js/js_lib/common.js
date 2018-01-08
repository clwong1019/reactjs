$(document).ready(function() {
    document.addEventListener("deviceready", onDeviceReadyTouch, false);
    // document.getElementById('write').addEventListener('click', writeToLocal, false);
    // document.getElementById('getPes').addEventListener('click', getData('pes'), false);
    // document.getElementById('getTemp').addEventListener('click', getData('temp'), false);
    // document.getElementById('clear').addEventListener('click', clearData, false);
});


function onDeviceReadyTouch() {
    // init3d();
    // startPdfHandler();
}

function init3d() {
    ThreeDeeTouch.onHomeIconPressed = function (payload) {
        if ( (payload.type == 'app') && (payload.title == 'CITICtoken') ) {
            var url_scheme = 'iDGateCITIC://';
            // var url_scheme = 'calshow://';

            appAvailability.check(
                url_scheme,
                function() {
                    window.open(url_scheme, '_system');
                },
                function() {
                    window.open("https://itunes.apple.com/app/id1219197546");
                }
            );
        } else if ( (payload.type == 'browser') && (payload.title == 'Corporate Website') ) {
            window.open('https://www.cncbinternational.com');
        }
    }
}

function startPdfHandler() {
    window.onclick = function(event) { 
        if (event.toElement.pathname) {
            if (event.toElement.pathname.match("pdf$")) {
                var url = event.toElement.protocol + "\/\/" + event.toElement.hostname + event.toElement.pathname;
                if (device.platform == 'Android') {
                    event.preventDefault(); 
                    navigator.app.loadUrl(url, { openExternal:true });
                } else if (device.platform == 'iOS') {
                    event.preventDefault(); 
                    var ref = cordova.InAppBrowser.open(url, '_blank', 'location=no');                    
                }
            }
        }
    };
}


function writeToLocal() {
    console.log("writeToLocal");
    var tempStorage = window.sessionStorage;
    window.localStorage.setItem("pes", "This is pes Data");
    window.sessionStorage .setItem("temp", "This is temp Data");
}

function getData(type) {
    console.log("Get Data: type = ", type);
    var value = window.localStorage.getItem(type);
    console.log("Retrieved value = ", value);
    if (value === null || value === undefined) {
        document.getElementById('type').innerHTML = "Cannot find";
    }
    document.getElementById(type).innerHTML = value;
}

function clearData() {
    console.log("clearData()");
    window.localStorage.clear();
}