(function (window) {
    'use-strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FirebaseDataStore(config) {
        if (!config) {
            throw new Error('No remote URL supplied.');
        }

        firebase.initializeApp();
    }

    FirebaseDataStore.prototype.add = function (key, val) {
        var fbdb = firebase.firestore();
        return fbdb.collection("coffeeorders").doc(key).set({
            name: val.coffee,
            email: val.emailAddress,
            size: val.size,
            flavor: val.flavor,
            strength: val.strength
        });
    };

    FirebaseDataStore.prototype.getAll = function (cb) {
        return $.get(this.serverUrl, function (serverResponse) {
            if (cb) {
                console.log(serverResponse);
                cb(serverResponse);
            }
        });
    };

    FirebaseDataStore.prototype.get = function (key, cb) {
        return $.get(this.serverUrl + '/' + key, function (serverResponse) {
            if (cb) {
                console.log(serverResponse);
                cb(serverResponse);
            }
        });
    };

    FirebaseDataStore.prototype.remove = function (key) {
        return $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE'
        });
    };

    App.FirebaseDataStore = FirebaseDataStore;
    window.App = App;

})(window);