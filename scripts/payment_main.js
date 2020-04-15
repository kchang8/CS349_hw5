(function (window) {
    'use-strict'
    var PAYMENT_SELECTOR = '[data-payment="form"]';
    var App = window.App;
    var FormHandler = App.FormHandler;
    var paymentHandler = new FormHandler(PAYMENT_SELECTOR);

    paymentHandler.addSubmitHandler(function(data) {
        var modalBox = document.querySelector('[payment="response"]');
        modalBox.textContent = "Thank you for your payment " + data['title'] +  " " + data['username'];

        $('#ex1').modal({
            show: 'true'
        });
    });

})(window);