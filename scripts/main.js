(function (window) {
    'use-strict'
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    var config = {
        apiKey: "AIzaSyCEBalT5iAp1lGCynPnfv4azfTndbv27Uw",
        authDomain: "fir-coffeerun.firebaseapp.com",
        databaseURL: "https://fir-coffeerun.firebaseio.com",
        projectId: "fir-coffeerun",
        storageBucket: "fir-coffeerun.appspot.com",
        messagingSenderId: "954841803296",
        appId: "1:954841803296:web:aa7e18909d70e98d4b2a45",
        measurementId: "G-822KSLMYM3"
    };
    
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FirebaseDataStore = App.FirebaseDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;

    var remoteDS = new FirebaseDataStore(config);
    var myTruck = new Truck('ncc-1701', remoteDS);
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    var formHandler = new FormHandler(FORM_SELECTOR);
    window.myTruck = myTruck;

    formHandler.addSubmitHandler(function (data) {
        myTruck.createOrder.call(myTruck, data).then(function () {
            checkList.addRow.call(checkList, data);
        });
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);

    myTruck.printOrders(checkList.addRow.bind(checkList));

    //webshim.polyfill('forms forms-ext');
    //webshim.setOptions('forms', { addValidators: true, lazyCustomMessage: true });

})(window);