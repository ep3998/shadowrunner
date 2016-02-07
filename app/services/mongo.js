(function(){
    'use strict';

    angular
        .module('shadowrunnerApp')
        .factory('Mongo', mongo);

    mongo.$inject = ['$resource'];

    function mongo($resource){
        return $resource('http://localhost:3000/:model/:id', null, {
            'update': { method:'PUT' }
        });
    }
})();