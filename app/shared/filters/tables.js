/**
 * Created by ep3998 on 2/7/2016.
 */
(function(){
    'use strict';

    angular.module('shadowrunnerApp')
    .filter("numColFilter", function(){
        return function(input, row, numColumns){
            var returnArray = [];
            for(var x = row * numColumns; x < row * numColumns + numColumns; x++){
                var condition = input[x];
                if(x < input.length){
                    returnArray.push(condition);
                }
                //else{
                //    var blankCell = {
                //        "index": x,
                //        "classes": "condition-block"
                //    };
                //    returnArray.push(blankCell); //this is used for the empty cells
                //}
            }
            return returnArray;
        }
    })
    .filter("numRowFilter", function(){
        return function(input, numColumns){
            var filtered = [];
            for(var x = 0; x < input.length; x++){
                if(x % numColumns === 0){
                    filtered.push(filtered.length);
                }
            }
            return filtered;
        }
    });
})();