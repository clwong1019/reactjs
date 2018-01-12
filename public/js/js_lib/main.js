
var debuging = false;
var uuid = '';

$(document).ready(function () {
    //console.log("listen to device ready 22222");
    document.addEventListener("deviceready", onDeviceReady, false);
});

function onDeviceReady() {
    console.log("~~~~~~~~~ jb_lib ~~~~~~~~~");
    console.log(">>>>>>>> (1) device ready " + getTimeStamp() + " <<<<<<<<");

    // document.addEventListener("mfpjsonjsloaded", onMfpjsonjsloaded, false);
    // document.addEventListener("backbutton", onBackKeyDown, false);
}

function onMfpjsonjsloaded() {
    //console.log(">>>>>> (3) onMfpjsonjsloaded " + getTimeStamp() + " <<<<<<");
    initMobileFirstClient();
}



function initMobileFirstClient() {
    //console.log(">>>>>> (4) initMobileFirstClient " + getTimeStamp() + " <<<<<<");
    var initMobileFirstSuccessCallback = function (result) {
        //console.log("WL.Client.init Success");
        //console.log(result);
        connectMobileFirstServer();
    }
    var initMobileFirstFailureCallback = function (error) {
        //console.log("WL.Client.init failed");
        //console.log(error);
    }
    WL.Client.init({
        onSuccess: initMobileFirstSuccessCallback,
        onFailure: initMobileFirstFailureCallback,
        timeout: 10000
    });
}



function connectMobileFirstServer() {
    //console.log("Connecting to Mobile First server");
    var wlConnectSuccessCallback = function () {
        //console.log("Connect to Mobile First server success");
        getAppConfigRemote();
    }
    var wlConnectFailureCallback = function (error) {
        //console.log("Connect to Mobile First server failed");
        //console.log(error);
        if (error.errorCode != 'CONNECTION_IN_PROGRESS') {
            //console.log("WL.Client.init fatal error");
        }
    }

    WL.Client.pinTrustedCertificatePublicKey("cncbinternationalcom.der").then(() => {
        //console.log('MobileBanking -> connectMobileFirstServer -> cert pinning success');
        WL.Client.connect({
            onSuccess: wlConnectSuccessCallback,
            onFailure: wlConnectFailureCallback,
            timeout: 10000
        });
    }, () => {
        //console.log('MobileBanking -> connectMobileFirstServer -> cert pinning fail');
        let error = {
            errorCode: 'CERT_PIN_ERROR'
        };
        wlConnectFailureCallback(error);
    });
}

function getAppConfigRemote() {
    //console.log("Get App config from adapter");
    var getAppConfigSuccessCallback = function (result) {
        //console.log("MFP invokeProcedure success !!!");
        //console.log(result);
        //console.log(result.responseJSON.appConfig);
        var jsonStoreKey = result.responseJSON.appConfig.jsonStoreConfig.jsonStoreKey;
        initJsonstore(jsonStoreKey);
    }
    var getAppConfigFailureCallback = function (error) {
        //console.log("MFP invokeProcedure failed");
        //console.log(error);
    }
    var invocationData = {
        adapter: "MbAppConfigAdapter",
        procedure: "getAppConfig",
        parameters: []
    };
    WL.Client.invokeProcedure(invocationData, {
        onSuccess: getAppConfigSuccessCallback,
        onFailure: getAppConfigFailureCallback,
        timeout: 10000
    });
}

function initJsonstore(jsonStoreKey) {
    //console.log("initialize JSONStore");
    var jsonstoreInitSuccessCallback = function () {
        //console.log("Jsonstore init success");

        initNNL();
    }
    var jsonstoreInitFailureCallback = function (error) {
        //console.log("Jsonstore init fail");
        //console.log(error);
    }
    jsonstoreInit(jsonStoreKey, jsonstoreInitSuccessCallback, jsonstoreInitFailureCallback)
}

function loadUUID() {

    //console.log("loadUUID:");
    //console.log("check whether UUID is in Jsonstore:");

    var getUuidSuccessCallback = function (uuidFromJsonstore) {
        //console.log("getUuidSuccessCallback success");
        //console.log("uuid from jsonstore = " + uuidFromJsonstore);
        uuid = uuidFromJsonstore;
        initFinished();
    }
    var getUuidFailureCallback = function () {
        //console.log("getUuidFailureCallback fail");
    }

    getJsonstoreData('uuid', getUuidSuccessCallback, getUuidFailureCallback);
}


function initNNL() {
    //console.log("init NNL Plugin");
    var initNNLPlugSuccessCallback = function () {
        //console.log("initNNLPlugin success");
        loadUUID();
    }

    var initNNLPlugFailureCallback = function () {
        //console.log("initNNLPlugin fail");
    }

    initNNLPlugin(initNNLPlugSuccessCallback, initNNLPlugFailureCallback);
}


function initFinished() {
    // all done, emit jslibloaded event
    var jslibloaded = new Event('jslibloaded');
    document.dispatchEvent(jslibloaded);
    //console.log(">>>>>> Emit event jslibloaded from onMfpjsonjsloaded <<<<<<");
}

function onBackKeyDown() {
    //console.log("ignore back button");
    var event = new Event('clickBackButton');
}

function getTimeStamp() {
    var newDate = new Date();
    dateString = newDate.toUTCString();
    return dateString;
}


