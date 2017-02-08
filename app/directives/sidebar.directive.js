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

    Controller.$inject = ["$http", "$rootScope"];

    /* @ngInject */
    function Controller($http, $rootScope) {
        var vm = this;

        // Functions
        vm.updateOptions = updateOptions;
        vm.initOptions = initOptions;
        vm.newSighting = newSighting;

        // Species filter init
        var allSpecies = {name: "all"}
        vm.species = [allSpecies]
        vm.speciesFilter = vm.species[0];

        activate();

        function activate() {
            getSpecies()
            vm.updateOptions()

            $rootScope.$on("sightingsLoaded", function() {
                vm.updateOptions();
            });
        }

        function updateOptions() {
            vm.sightingsOptions = {
                order: vm.order,
                speciesFilter: vm.speciesFilter,
                minBirdNum: vm.minBirdNum,
                maxBirdNum: vm.maxBirdNum
            }

            $rootScope.$broadcast("updateSightingOptions", vm.sightingsOptions)
        }

        function initOptions() {
            vm.order = "0";
            vm.speciesFilter = vm.species[0];
            vm.minBirdNum = null;
            vm.maxBirdNum = null;

            vm.updateOptions()
        }

        function newSighting() {
            $rootScope.$broadcast("newSighting");
        }

        function getSpecies() {
            $http.get("/species")
                .then(function(res) {
                    vm.species = res.data;
                    vm.species.unshift(allSpecies)
                    vm.initOptions();
                });
        }
    }
})();
