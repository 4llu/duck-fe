(function() {
    "use strict";

    angular
        .module("app")
        .directive("newSighting", directive);

    /* @ngInject */
    function directive() {
        var directive = {
            restrict: "E",
            replace: "true",
            templateUrl: "/app/directives/newSighting.directive.html",
            scope: {},
            controller: Controller,
            controllerAs: "vm",
            bindToController: true
        };

        return directive;
    }

    Controller.$inject = ["$http", "$rootScope"];

    /* @ngInject */
    function Controller($http, $rootScope) {
        var vm = this;

        // Variables
        vm.show = false;

        // Functions
        vm.close = close;
        vm.submit = submit;

        activate();

        function activate() {
            $rootScope.$on("newSighting", function() {
                open();
            });
        }

        function open() {
            $("body").addClass("modal-open")
            vm.show = true;
        }

        function close() {
            this.show = false;
            $("body").removeClass("modal-open")
        }

        function submit() {
            
        }
    }
})();
