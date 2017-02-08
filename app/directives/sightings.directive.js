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

    Controller.$inject = [];

    /* @ngInject */
    function Controller() {
        var vm = this;

        activate();

        function activate() {

        }
    }
})();
