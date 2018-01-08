
var appDataCollectionName = 'appData';

function jsonstoreInit(jsonStoreKey, successCallback, failureCallback) {


    var initOptions = { username: "CNCBIUSER", password: jsonStoreKey };
    var appDataInitCheckName = 'isAppDataInitialized';
    var defaultAppData = [
        { name: 'isAppDataInitialized', value: 'Y' },
        { name: 'uuid', value: '' },
        { name: 'userCd', value: null },
        { name: 'tncAccepted', value: false },
        { name: 'isRegistered', value: false },
        { name: 'isFirstLogin', value: true }
    ];
    
    var localCollectionsDefinition = { appData:
        { searchFields:
            { name: "string" }
        }
    };

    //console.log("DataPersister -> init -> Start");
    // if (this.checkWLJSONStoreSupport()) {
    if (true) {
        WL.JSONStore.init(localCollectionsDefinition, initOptions)
        .then(function (res) {
            //console.log("DataPersister -> init -> JSONStore init successfully");
            var query = { name: appDataInitCheckName };
            var options = { exact: true };
            WL.JSONStore.get(appDataCollectionName)
                .find(query, options)
                .then(function (arrayResults) {
                    // array should not be null, the following case will be deleted
                    if (arrayResults.length === 0) {
                        //console.log("DataPersister -> init -> Attempt to add data to JSONStore");
                        var data = defaultAppData;
                        var addOptions = { markDirty: false };

                        WL.JSONStore.get(appDataCollectionName)
                            .add(data, addOptions)
                            .then(function (numberOfDocumentsAdded) {
                                //console.log("DataPersister -> init -> Number of documents added: " + numberOfDocumentsAdded);
                            })
                            .fail(function (errorObject) {
                                //console.log("DataPersister -> init -> Failed to add data: " + JSON.stringify(errorObject));
                                //this.handleJSONStoreError(errorObject, failureCallback);
                            })
                    } else {
                        //console.log("DataPersister -> init -> JSONStore data was initialized");
                        WL.JSONStore.get(appDataCollectionName).findAll()
                            .then(function (jsonstoreDocuments) {
                                var isSuccessful = true;
                                if (jsonstoreDocuments && defaultAppData && jsonstoreDocuments.length !== defaultAppData.length) {
                                    //console.log("DataPersister -> init -> jsonstoreDocuments.length: " + jsonstoreDocuments.length);
                                    //console.log("DataPersister -> init -> defaultAppData.length: " + defaultAppData.length);
                                    var updatedDoc = [];
                                    for (var i = 0; i < defaultAppData.length; i++) {
                                        var found = false;
                                        for (var j = 0; j < jsonstoreDocuments.length; j++) {
                                            if (defaultAppData[i].name === jsonstoreDocuments[j].json.name) {
                                                found = true;
                                                break;
                                            }
                                        }
                                        if (!found) {
                                            //console.log("DataPersister -> init -> " + defaultAppData[i].name + " not existed, will be added to JSONStore");
                                            updatedDoc.push(defaultAppData[i]);
                                        }
                                    }
                                    if (updatedDoc.length > 0) {
                                        //console.log("Add elements which not added in app");
                                        //console.log(updatedDoc);
                                        var addOptions = { markDirty: false };
                                        WL.JSONStore.get(appDataCollectionName)
                                            .add(updatedDoc, addOptions)
                                            .then(function (numberOfDocumentsAdded) {
                                                //console.log("DataPersister -> init -> Number of documents added = " + numberOfDocumentsAdded);
                                            })
                                            .fail(function (errorObject) {
                                                //console.log(defaultAppData);
                                                //console.log("DataPersister -> init -> Failed to add data : " + JSON.stringify(errorObject));
                                                isSuccessful = false;
                                            });
                                    } else {
                                        //console.log("DataPersister -> init -> jsonstoreDocuments.length and defaultAppData.length are the same : " + jsonstoreDocuments.length);
                                    }
                                    if (isSuccessful) {
                                        if (typeof successCallback === 'function') {
                                            successCallback();
                                        }
                                    } else {
                                        if (typeof failureCallback === 'function') {
                                            failureCallback();
                                        }
                                    }
                                } else {
                                    //console.log("DataPersister -> init -> jsonstoreDocuments.length and defaultAppData.length are the same : " + jsonstoreDocuments.length);
                                    if (typeof successCallback === 'function') {
                                        successCallback();
                                    }
                                }
                            })
                            .fail(function (errorObject) {
                                //console.log("DataPersister -> init -> Failed to find data: " + JSON.stringify(errorObject));
                                //this.handleJSONStoreError(errorObject, failureCallback);
                            })
                    }
                })
                .fail(function (errorObject) {
                    //console.log("DataPersister -> init -> Failed to get data: " + JSON.stringify(errorObject));
                    //this.handleJSONStoreError(errorObject, failureCallback);
                });
        })
        .fail(function (errorObject) {
            //console.log("DataPersister -> init -> Failed to initialize data: " + JSON.stringify(errorObject));
            //this.handleJSONStoreError(errorObject, failureCallback);
        });
    } else {
        if (this.checkWebStorageSupport) {
            if (localStorage.getItem('isAppDataInitialized') === undefined) {
                //console.log("DataPersister -> init -> Initializing web storage");
                localStorage.setItem('isAppDataInitialized', 'Y');
                localStorage.setItem('userPreferredLanguage', 'null');
            } else {
                //console.log("DataPersister -> init -> Web storage was initialized");
            }
            if (typeof successCallback === 'function') {
                successCallback();
            }
        } else {
            //console.log("DataPersister -> init -> Web storage not supported");
            if (typeof failureCallback === 'function') {
                failureCallback(null);
            }
        }
    }
}



function getJsonstoreData(itemName, successCallback, failureCallback) {
    var initSuccessCallback = function(result) {
        //console.log('init JSONStore success');
    }
    var initFailCallback = function(error) {
        //console.log('init JSONStore fail');
        failureCallback(error);
        return;
    }

    //console.log("DataPersister -> getAppDataByNameValue -> Start: " + itemName);
    //console.log("DataPersister -> getAppDataByNameValue -> appDataCollectionName: " + appDataCollectionName);
    if (this.checkWLJSONStoreSupport()) {
        var query = { name: itemName };
        var options = { exact: true };
        WL.JSONStore.get(appDataCollectionName)
            .find(query, options)
            .then(function (arrayResults) {
                if (arrayResults[0] !== undefined) {
                    //console.log("DataPersister -> getAppDataByNameValue -> " + itemName + ", " + "Successful: " + JSON.stringify(arrayResults[0].json.value));
                    successCallback(arrayResults[0].json.value);
                } else {
                    //console.log("DataPersister -> getAppDataByNameValue -> " + itemName + ", Failed: arrayResults is undefined");
                    failureCallback();
                }
            })
            .fail(function (errorObject) {
                //console.log("DataPersister -> getAppDataByNameValue -> " + itemName + ", Failed to get data");
                if (typeof failureCallback === 'function') {
                    failureCallback(errorObject);
                }
            });
    } else {
        if (this.checkWebStorageSupport) {
            //console.log("DataPersister -> getAppDataByNameValue -> " + itemName + ", Successful: " + localStorage.getItem(itemName));
            if (typeof successCallback === 'function') {
                try {
                    successCallback(JSON.parse(localStorage.getItem(itemName)));
                } catch (e) {
                    successCallback(localStorage.getItem(itemName));
                }
            }
        } else {
            //console.log("DataPersister -> getAppDataByNameValue -> " + itemName + ", Web storage not supported");
            if (typeof failureCallback === 'function') {
                failureCallback(null);
            }
        }
    }
}

function setJsonstoreData(itemName, itemValue, successCallback, failureCallback) {
    //console.log("DataPersister -> setAppDataByNameValue -> Start");
    //console.log("DataPersister -> setAppDataByNameValue -> appDataCollectionName:" + appDataCollectionName);
    if (this.checkWLJSONStoreSupport()) {
        var data = [{ name: itemName, value: itemValue }];
        var changeOptions = { replaceCriteria: ['name'] };
        WL.JSONStore.get(appDataCollectionName)
            .change(data, changeOptions)
            .then(function () {
                //console.log("DataPersister -> setAppDataByNameValue -> " + itemName + ", Successful to set data");
                if (typeof successCallback === 'function') {
                    successCallback(itemValue);
                }
            })
            .fail(function (errorObject) {
                //console.log("DataPersister -> setAppDataByNameValue -> " + itemName + ", Failed to set data");
                failureCallback(errorObject);
            });
    } else {
        if (this.checkWebStorageSupport) {
            //console.log("DataPersister -> setAppDataByNameValue -> " + itemName + ", Successful to set data");
            try {
                localStorage.setItem(itemName, JSON.stringify(itemValue));
            } catch (e) {
                localStorage.setItem(itemName, itemValue);
            }
            if (typeof successCallback === 'function') {
                successCallback();
            }
        } else {
            //console.log("DataPersister -> setAppDataByNameValue -> " + itemName + ", Web storage not supported");
            if (typeof failureCallback === 'function') {
                failureCallback(null);
            }
        }
    }
}

function checkWLJSONStoreSupport() {
    if (typeof (WL) !== 'undefined') {
        if (typeof (WL.JSONStore) !== 'undefined') {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}
function checkWebStorageSupport() {
    if (typeof (Storage) !== 'undefined') {
        return true;
    } else {
        return false;
    }
}
function handleJSONStoreError(errorObject, failureCallback) {
    this.loggerService.logDebug("DataPersister -> handleJSONStoreError -> JSONStore error code: " + errorObject.err);
    if (errorObject.err === -3) {
        WL.JSONStore.destroy();
        WL.Client.reloadApp();
    } else {
        if (typeof failureCallback === 'function') {
            failureCallback(errorObject);
        }
    }
}


function safeInit(inJsonStoreKey, successCallback, failureCallback) {
    
    var count = 0;
    var existCondition = setInterval(function() {
        var jstore = WL.JSONStore.get(appDataCollectionName);
        if (jstore) {
            //console.log("Exists!");
            clearInterval(existCondition);
            successCallback();
        } else {
            if (count++ > 10) {
                //console.log("Failed!");
                clearInterval(existCondition);
                failureCallback();
            }
            jsonstoreInit();
            //console.log("Waiting");
        }
    }, 2000);

}

