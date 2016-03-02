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
            sheetCharacter: ''
        };

        var creator = {
            concept: {}
        };

        return {
            getSheetCharacter: function(){ return ids.sheetCharacter;},
            setSheetCharacter: function(id){ ids.sheetCharacter = id;},

            getCreateConcept: function(){ return creator.concept;},
            setCreateConcept: function(data){ creator.concept = data;}
        }
    }
})();
