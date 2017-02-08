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

    Controller.$inject = ["$http", "$rootScope"];

    /* @ngInject */
    function Controller($http, $rootScope) {
        var vm = this;

        // Functions
        vm.getSightings = getSightings;

        // Variables
        vm.allSightings = [];
        vm.sightings = vm.allSightings;

        activate();

        function activate() {
            getSightings()

            $rootScope.$on("updateSightingOptions", function(event, data) {
                arrangeSightings(data)
            });
        }

        function arrangeSightings(options) {
            var tempArray = vm.allSightings;
            // Arrange list as per options
            tempArray = tempArray.filter(function(value){ return options.minBirdNum ? value.count >= options.minBirdNum : true });
            tempArray = tempArray.filter(function(value){ return options.maxBirdNum ? value.count <= options.maxBirdNum : true });
            tempArray = tempArray.filter(function(value){ return options.speciesFilter.name != "all" ? value.species == options.speciesFilter.name : true });
            tempArray = tempArray.sort(compareDates);
            if (options.order == "0") tempArray = tempArray.reverse()
            vm.sightings = tempArray;
        }

        function compareDates(a, b) {
            var aDate = new Date(a.dateTime)
            var bDate = new Date(b.dateTime)
            if (aDate.getTime() === bDate.getTime()) {
                return 0
            } else if (aDate > bDate) {
                return 1
            } else {
                return -1
            }
        }

        function getSightings() {
            $http.get("/sightings")
                .then(function(res) {
                    vm.allSightings = res.data;
                    vm.sightings = vm.allSightings;

                    $rootScope.$broadcast("sightingsLoaded")
                });
        }
    }
})();
