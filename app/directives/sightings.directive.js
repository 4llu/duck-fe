(function() {
    "use strict";

    angular
        .module("app")
        .directive("sightings", directive);

    /* @ngInject */
    function directive() {
        var directive = {
            restrict: "E",
            replace: "true",
            templateUrl: "/app/directives/sightings.directive.html",
            scope: {},
            controller: Controller,
            controllerAs: "vm",
            bindToController: true
        };

        return directive;
    }

    Controller.$inject = ["$http"];

    /* @ngInject */
    function Controller($http) {
        var vm = this;

        // Functions

        // Variables
        vm.sightings = [];

        activate();

        function activate() {
            getSightings()
        }

        function getSightings() {
            $http.get("/sightings")
                .then(function(res) {
                    vm.sightings = res.data;
                    console.log(vm.sightings);
                });
        }
    }
})();
