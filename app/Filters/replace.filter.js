(function() {
    angular
        .module("app")
        .filter("replace", filter);

    function filter() {
        return function(inp, r, w) {
            return inp.replace(r, w);
        }
    }
})();
