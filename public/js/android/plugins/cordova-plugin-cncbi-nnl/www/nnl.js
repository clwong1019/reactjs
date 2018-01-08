cordova.define("cordova-plugin-cncbi-nnl.sample", function(require, exports, module) {
var argscheck = require('cordova/argscheck');
var exec = require('cordova/exec');
var cordova = require('cordova');


var Nnl = function () {
    this.name = "Nnl";
};

Nnl.prototype.checkFingerprintIsValid = function(successCallback, errorCallback, data){
    cordova.exec(successCallback, errorCallback, "NNLPlugin", "checkFingerprintIsValid", [data]);
}

Nnl.prototype.init = function(successCallback, errorCallback, data){
    cordova.exec(successCallback, errorCallback, "NNLPlugin", "init", [data]);
}

Nnl.prototype.initReg = function(successCallback, errorCallback, data){
    cordova.exec(successCallback, errorCallback, "NNLPlugin", "initReg", [data]);
}

Nnl.prototype.initAuth = function(successCallback, errorCallback, data){
    cordova.exec(successCallback, errorCallback, "NNLPlugin", "initAuth", [data]);
}

Nnl.prototype.initDeleteReg = function(successCallback, errorCallback, data){
    cordova.exec(successCallback, errorCallback, "NNLPlugin", "initDeleteReg", [data]);
}

Nnl.prototype.process = function(successCallback, errorCallback, data){
    cordova.exec(successCallback, errorCallback, "NNLPlugin", "process", [data]);
}

Nnl.prototype.finish = function(successCallback, errorCallback, data){
    cordova.exec(successCallback, errorCallback, "NNLPlugin", "finish", [data]);
}


module.exports = new Nnl();

});
