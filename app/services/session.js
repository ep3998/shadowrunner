/**
 * Created by ep3998 on 2/6/2016.
 */
(function(){
    'use strict';

    angular
        .module('shadowrunnerApp')
        .factory('Session', session);

    function session(){
        var ids = {
            character: ''
        };

        return {
            getCharacter: function(){ return ids.character;},
            setCharacter: function(id){ ids.character = id;}
        }
    }
})();
