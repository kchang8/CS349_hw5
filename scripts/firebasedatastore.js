(function (window) {
    'use-strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FirebaseDataStore(config) {
        if (!config) {
            throw new Error('No remote URL supplied.');
        }

        firebase.initializeApp(config);
        this.fbdb = firebase.firestore();
    }

    FirebaseDataStore.prototype.add = function (key, val) {
        return this.fbdb.collection("coffeeorders").doc(key).set({
            coffee: val.coffee,
            email: key,
            size: val.size,
            flavor: val.flavor,
            strength: val.strength
        });
    };

    FirebaseDataStore.prototype.getAll = function () {
        var dict = {};
        this.fbdb.collection("coffeeorders").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                dict[doc.id] = doc.data();
                console.log(doc.id, " => ", doc.data());
            });
         });
        return dict;
    };

    FirebaseDataStore.prototype.get = function (key) {
        var docRef = this.fbdb.collection("coffeeorders").doc(key);
        return docRef.get();
    };

    FirebaseDataStore.prototype.remove = function (key) {
        return this.fbdb.collection("coffeeorders").doc(key).delete().then(function() {
            console.log("Document successfully deleted");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    };

    FirebaseDataStore.prototype.initChecklist = function (checklist) {
        this.fbdb.collection("coffeeorders").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              checklist.addRow.call(checklist, doc.data());
            });
        });
      };

    App.FirebaseDataStore = FirebaseDataStore;
    window.App = App;

})(window);