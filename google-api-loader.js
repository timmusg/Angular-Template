//Configuration file for google API access
//Uses google_settings file to get Nimwit specific settings for google API access

var google_settings = require("./google-settings.json");

var clientsLoaded = 0;

var sign2Loaded = false;
var auth2Loaded = false;
var auth2;

module.exports = {
    clientsLoaded: (callback) => {

        var ids = 0;

        var check = function () {
            if (ids++ > 1000 || google_settings.libraries.length === clientsLoaded) {
                callback();
            }
            else {
                window.setTimeout(function () {
                    check();
                }, 100);
            }
        }

        check();
    },
    authLoaded: (callback) => {
        var check = function () {
            if (auth2Loaded) {
                callback();
            }
            else {
                window.setTimeout(function () {
                    check();
                }, 100);
            }
        }

        check();
    },
    gapiLoaded: (callback) => {
        var hasgapi = function () {
            if (typeof (gapi) !== "undefined" && gapi.client) {
                callback();
            }
            else {
                window.setTimeout(function () {
                    hasgapi();
                }, 100);
            }
        }

        hasgapi();
    },
    getAuth2: () => {
        return auth2;
    },
    signIn: () => {

        var options = new gapi.auth2.SigninOptionsBuilder({
            scopes: google_settings.scopes.join(' ')
        });

        this.getAuth2().signIn(options).then(function (success) {
        }, function (fail) {
        });
    }
};


module.exports.gapiLoaded(() => {

    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'

    gapi.load('client:auth2', function () {
        auth2 = gapi.client.init({
            'apiKey': 'AIzaSyD-C2H5rUnFIabmrnbvl5ocAz9BeqKHJXI',
            'discoveryDocs': [discoveryUrl],
            clientId: '829967721563-ik3sl7l1k041k7n6g3m3unc98h8p1l1q.apps.googleusercontent.com',
            scope: google_settings.scopes.join(' ')
        });
        auth2Loaded = true;
    });

    var clientLoaded = function clientLoaded() {
        clientsLoaded++;
    }

    for (var i = 0; i < google_settings.libraries.length; i++) {
        var client = google_settings.libraries[i];
        gapi.client.load(client.name, client.version, clientLoaded);
    }
});
