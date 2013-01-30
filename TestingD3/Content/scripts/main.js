

require.config({
    paths: {
        'jquery': 'libs/jquery/jquery',
        'text': 'libs/amd/text'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        underscore: {
            exports: '_'
        },
        knockout: {
            exports: 'ko'
        }
    }
});

define(['libs/durandal/app'], function (app) {
    app.start().then(function () {
        app.adaptToDevice();
        app.setRoot('app/flcounties');
    });
});