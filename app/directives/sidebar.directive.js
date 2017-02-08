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

        vm.initOptions = initOptions;
        vm.updateOrder = updateOrder;
        vm.updateSpeciesFilter = updateSpeciesFilter;
        vm.updateMinBirdNum = updateMinBirdNum;
        vm.updateMaxBirdNum = updateMaxBirdNum;

        // Species filter init
        var allSpecies = {name: "all"}
        vm.species = [allSpecies]
        vm.speciesFilter = vm.species[0];

        activate();

        function activate() {
            getSpecies()
        }

        function updateOrder() {
            console.log(vm.order);
        }

        function updateSpeciesFilter() {
            console.log(vm.speciesFilter);
        }

        function updateMinBirdNum() {
            console.log(vm.minBirdNum);
        }

        function updateMaxBirdNum() {
            console.log(vm.maxBirdNum);
        }

        function initOptions() {
            vm.order = "0";
            vm.speciesFilter = vm.species[0];
            vm.minBirdNum = null;
            vm.maxBirdNum = null;

            vm.updateOrder();
            vm.updateSpeciesFilter();
            vm.updateMinBirdNum();
            vm.updateMaxBirdNum();
        }

        function getSpecies() {
            vm.species = [
                  {
                    name: "mallard"
                  },
                  {
                    name: "redhead"
                  },
                  {
                    name: "gadwall"
                  },
                  {
                    name: "canvasback"
                  },
                  {
                    name: "lesser scaup"
                  }
                ];

            vm.species.unshift(allSpecies)

            vm.initOptions();
        }
    }
})();
