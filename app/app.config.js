(function() {
    "use strict";

    angular
        .module("app")
        .config(config);

    function config($stateProvider, $urlRouterProvider, $compileProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "/index.html",
            });

        $compileProvider.debugInfoEnabled(false);
    }
})();
