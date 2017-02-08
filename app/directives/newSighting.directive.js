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

    Controller.$inject = ["$http", "$rootScope", "$filter"];

    /* @ngInject */
    function Controller($http, $rootScope, $filter) {
        var vm = this;

        // Variables
        vm.show = true;

        // Functions
        vm.close = close;
        vm.submit = submit;

        // Species init
        vm.speciesList = []

        activate();

        function activate() {
            getSpecies()


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
            vm.newSightingForm.time.$pristine = false;
            vm.newSightingForm.count.$pristine = false;
            vm.newSightingForm.species.$pristine = false;
            vm.newSightingForm.description.$pristine = false;
            
            if (vm.newSightingForm.$valid) {
                var data = {
                    species: vm.species.name,
                    description: vm.description,
                    dateTime: $filter("date")(vm.time, "yyyy-MM-ddTHH:mm:ss") + "Z",
                    count: vm.count,
                }
                console.log(data);

                // $http.post("/sightings", data);
            }
        }

        function getSpecies() {
            $http.get("/species")
                .then(function(res) {
                    vm.speciesList = res.data;
                });
        }
    }
})();
