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

    Controller.$inject = ["$http", "$rootScope", "$filter", "$timeout"];

    /* @ngInject */
    function Controller($http, $rootScope, $filter, $timeout) {
        var vm = this;

        // Variables
        vm.show = false;
        vm.submitError = false;
        vm.submitSuccess = false;

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
            vm.show = false;
            $("body").removeClass("modal-open")
        }

        function submit() {
            // Reset messages
            vm.submitSuccess = false;
            vm.submitError = false;

            // Check all
            vm.newSightingForm.time.$pristine = false;
            vm.newSightingForm.count.$pristine = false;
            vm.newSightingForm.species.$pristine = false;
            vm.newSightingForm.description.$pristine = false;

            // If valid
            if (vm.newSightingForm.$valid) {
                var data = {
                    species: vm.species.name,
                    description: vm.description,
                    dateTime: $filter("date")(vm.time, "yyyy-MM-ddTHH:mm:ss") + "Z",
                    count: vm.count,
                }

                $http.post("/sightings", data)
                    .then(function(res) {
                        // Show message
                        vm.submitSuccess = true;

                        // Reset form
                        vm.description = undefined;
                        vm.count = undefined;
                        vm.time = undefined;
                        vm.species = undefined;

                        vm.newSightingForm.time.$pristine = true;
                        vm.newSightingForm.count.$pristine = true;
                        vm.newSightingForm.species.$pristine = true;
                        vm.newSightingForm.description.$pristine = true;

                        $rootScope.$broadcast("newSightingAdded");

                        $timeout(function(){
                            close();
                            vm.submitSuccess = false;
                        }, 2000)
                    },
                    function(res) {
                        // Show message
                        vm.submitError = true;
                    }
                )
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
