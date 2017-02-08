(function() {
    "use strict";

    angular
        .module("app")
        .directive("sidebar", directive);

    /* @ngInject */
    function directive() {
        var directive = {
            restrict: "E",
            replace: "true",
            templateUrl: "/app/directives/sidebar.directive.html",
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

        vm.species = [
              {
                name: 'mallard'
              },
              {
                name: 'redhead'
              },
              {
                name: 'gadwall'
              },
              {
                name: 'canvasback'
              },
              {
                name: 'lesser scaup'
              }
            ];
            
        activate();

        function activate() {

        }

        function orderBy() {

        }
    }
})();
