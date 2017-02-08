(function() {
    "use strict";

    angular
        .module("app")
        .config(config);

    function config($stateProvider, $urlRouterProvider, $compileProvider, $locationProvider) {

        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "/index.html"
            });

        $compileProvider.debugInfoEnabled(false);
        $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
        });
    }
})();
