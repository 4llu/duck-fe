(function() {
    angular
        .module("app")
        .filter("capitalize", filter);

    function filter() {
        return function(inp) {
            if (inp != null || inp.length != 0) {
                inp = inp.toLowerCase();
                return inp.charAt(0).toUpperCase() + inp.substring(1);
            }
        }
    }
})();
