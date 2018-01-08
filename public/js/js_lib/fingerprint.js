
// init NNL
function initNNLPlugin(successCallback, failCallback) {
    var initSuccessCallback = (function(result) {
        successCallback(result);
    });
    
    var initFailureCallback = (function(error) {
        failCallback(error);
    });
        
    nnl.init(initSuccessCallback, initFailureCallback);
}

// check is fingerprint available
function isTouchIdAvailable(successCallback, failCallback) {
    var isTouchIdAvailableSuccessCallback = (function(result) {
        var initNNLPluginSuccessCallback = function(result) {
            successCallback(1);
        }
        var initNNLPluginFailCallback = function(error) {
            failCallback(error);
        }
        initNNLPlugin(initNNLPluginSuccessCallback, initNNLPluginFailCallback);
    });
    
    var isTouchIdAvailableFailureCallback = (function(error) {
        if (error.logref == 'FP100') {
            successCallback(-1);
        } else {
            failCallback(error.logref);
        }
    });

    nnl.checkFingerprintIsValid(isTouchIdAvailableSuccessCallback, isTouchIdAvailableFailureCallback)
}

function isRegistered(userCd, successCallback, failureCallback) { 
    var getUserCdSuccessCallback = (function(result) {
        // Case 1
        if (userCd) {
            if ( (typeof result === 'undefined') || (result == "") || (!result) ) {
                successCallback(-1);
            } else if (userCd == result) {
                successCallback(1);
            } else if (userCd != result) {
                successCallback(-2);
            }
        } else {
        // Case 2
            if ( (typeof result === 'undefined') || (result == "") || (!result) ) {
                successCallback(-1);
            } else {
                successCallback(1);
            } 
        }
    });
    
    var getUserCdFailCallback = (function(error) {
        failCallback(error);
    });

    getUserCd(getUserCdSuccessCallback, failureCallback);
}

// init Reg
function initReg(successCallback, failureCallback) {
    var initRegSuccessCallback = (function(init_reg_message) {
        var init_reg_param = {
            "message": init_reg_message,
            "operation": "INIT_REG",
            "channel": "MBT",
            "device_model": device.model,
            "device_os": device.platform,
            "device_version": device.version,
            "device_uuid": uuid
        };
        successCallback(init_reg_param);
    });
    nnl.initReg(initRegSuccessCallback, failureCallback);
}



// process Reg
function finishReg(message, successCallback, failureCallback) {
    var finishRegSuccessCallback = (function(finish_reg_message) {
        var finish_reg_param = {
            "message": finish_reg_message,
            "operation": "FINISH_REG",
            "channel": "MBT",
            "device_model": device.model,
            "device_os": device.platform,
            "device_version": device.version,
            "device_uuid": uuid
        };
        successCallback(finish_reg_param);
    });


    var finishRegFailureCallback = (function(error) {
        if (error.logref.indexOf('FP') == 0) {  // pre-defined error
            failureCallback(error.logref);
        } else {                            // not defined error
            failureCallback(-1); 
        }
    });
    
    nnl.process(finishRegSuccessCallback, finishRegFailureCallback, {
        'action': 'reg',
        'message': message
    });
}


// init Auth
function initAuth(successCallback, failureCallback) {
    var initAuthSuccessCallback = (function(init_auth_message) {
        var getUserCdSuccessCallback = function(userCd) {
            var init_auth_param = {
                "userID": userCd,
                "message": init_auth_message,
                "operation": "INIT_AUTH",
                "channel": "MBT",
                "device_model": device.model,
                "device_os": device.platform,
                "device_version": device.version,
                "device_uuid": uuid
            };
            successCallback(init_auth_param);
        }
        var userCd = getUserCd(getUserCdSuccessCallback, failureCallback);
    });
    nnl.initAuth(initAuthSuccessCallback, failureCallback);
}


// finish Auth
function finishAuth(message, successCallback, failureCallback) {
    var finishAuthSuccessCallback = (function(finish_auth_message) {
        var getUserCdSuccessCallback = function(userCd) {
            var finish_auth_param = {
                "usrName": userCd,
                "credential": finish_auth_message,
                "channel": "MBT",
                "login": 2,
                "operation": "FINISH_REG",                
                "device_model": device.model,
                "device_os": device.platform,
                "device_version": device.version,
                "device_uuid": uuid
            };
            successCallback(finish_auth_param);
        }
        var userCd = getUserCd(getUserCdSuccessCallback, failureCallback);
    });

    var finishAuthFailureCallback = (function(error) {
        if (error.logref.indexOf('FP') == 0) {  // pre-defined error
            failureCallback(error.logref);
        } else {                            // not defined error
            failureCallback(-1)
        }
    });

    nnl.process(finishAuthSuccessCallback,finishAuthFailureCallback, {
        'action': 'auth',
        'message': message
    });
}

// Auth Alert
function authAlert(registrationList, successCallback, failureCallback) {

    var initDeleteRegSuccessCallback = (function(init_delete_reg_message) {
        handle = findHandle(registrationList, init_delete_reg_message);
        if (handle) {
            var getUserCdSuccessCallback = function(userCd) {
                var delete_reg_param = {
                    "userID": userCd,
                    "message": init_delete_reg_message,
                    "operation": 'AUTH_ALERT',
                    "deleteAll": 1,
                    "handle": handle,
                    "channel": 'MBT',
                    "device_model": device.model,
                    "device_os": device.platform,
                    "device_version": device.version,
                    "device_uuid": uuid
                };
                successCallback(delete_reg_param);
            }
            var userCd = getUserCd(getUserCdSuccessCallback, failureCallback);
        } else {
            failureCallback(); // handle not found
        }
    });

    nnl.initDeleteReg(initDeleteRegSuccessCallback,failureCallback);
}


// List Reg
function listReg(successCallback, failureCallback) {
    var getUserCdSuccessCallback = function(userCd) {
        var list_reg_param = {
            "userID": userCd,
            "operation": 'LIST_REG',
            "channel": 'MBT',
            "device_model": device.model,
            "device_os": device.platform,
            "device_version": device.version,
            "device_uuid": uuid
        };
        successCallback(list_reg_param);
    }
    var userCd = getUserCd(getUserCdSuccessCallback, failureCallback);
}




// init delete Reg
function deleteReg(registrationList, successCallback, failureCallback) {

    var initDeleteRegSuccessCallback = (function(init_delete_reg_message) {
        handle = findHandle(registrationList, init_delete_reg_message);
        if (handle) {
            var getUserCdSuccessCallback = function(userCd) {
                var delete_reg_param = {
                    "userID": userCd,
                    "message": init_delete_reg_message,
                    "operation": 'DELETE_REG',
                    "deleteAll": 1,
                    "handle": handle,
                    "channel": 'MBT',
                    "device_model": device.model,
                    "device_os": device.platform,
                    "device_version": device.version,
                    "device_uuid": uuid
                };
                successCallback(delete_reg_param);
            }
            var userCd = getUserCd(getUserCdSuccessCallback, failureCallback);
        } else {
            failureCallback(); // handle not found
        }
    });

    nnl.initDeleteReg(initDeleteRegSuccessCallback,failureCallback);
}

function finishDeleteReg(message, successCallback, failureCallback) {

    var finishDeleteRegSuccessCallback = (function(delete_reg_message) {
        successCallback();
    });

    nnl.process(finishDeleteRegSuccessCallback, failureCallback,{
        'action': "deleteReg",
        'message': message
    });
}



function findHandle(registrationList, init_delete_reg_message) {
    if (registrationList == '') {
        registrationList = null;
    }
    var deviceObj = JSON.parse(atob(init_delete_reg_message));
    var deviceID = deviceObj.device.id;
    //var regListObjs = JSON.parse(registrationList);
    if (!registrationList) {
        return null; // device not found from reg list
    } else {
        for (var i = 0; i < registrationList.length; i++) {
            var registration = registrationList[i];
            if (registration.device.id == deviceID) {
                return registration.authenticators[0].handle;
            }
        }
    }
    return null;
}

function isFirstLogin(successCallback, failureCallback) {
    function getDataSuccessCallback(result) {
        if (result == true) {
            successCallback(true);
        } else {
            successCallback(false);
        }
    }
    function getDataFailCallback(error) {
        failureCallback(error);
    }
    getJsonstoreData('isFirstLogin', getDataSuccessCallback, getDataFailCallback);
}


function saveFirstLogin(successCallback, failureCallback) {
    var setDataSuccessCallback = function(setDataResult) {
        successCallback();
    }
    var setDataFailCallback = function(setDataError) {
        failureCallback("JS_LIB: Save firstLogin failed");
    }
    setJsonstoreData('isFirstLogin', false, setDataSuccessCallback, setDataFailCallback);
}


function saveUserCd(userCd, successCallback, failureCallback) { 
    var setDataSuccessCallback = function(setDataResult) {
        successCallback(setDataResult);
    }
    var setDataFailCallback = function(setDataError) {
        failureCallback("JS_LIB: Save userCd failed");
    }
    setJsonstoreData('userCd', userCd, setDataSuccessCallback, setDataFailCallback);
}

function getUserCd(success, fail) {
    function successCallback(result) {
        if (result == null) {
            success(null);
        } else {
            success(result);
        }
    }
    function failCallback(error) {
        fail(error);
    }
    getJsonstoreData('userCd', successCallback, failCallback);
}

function deleteUserCd(successCallback, failureCallback) { 
    setJsonstoreData('userCd', "", successCallback, failureCallback);
}



