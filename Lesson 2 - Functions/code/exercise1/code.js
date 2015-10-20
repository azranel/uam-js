(function (global) {
	var addManyValues;

	if (!global.UAM) {
		global.UAM = {};
	}

	addManyValues = function () {
        var sum = 0;

        // !!! add all arguments to sum
				for (var i = 0; i < arguments.length; i++) {
	    		sum += arguments[i];
				}
        // !!! return function for use sum value as a base for next arythmetic operation but without change value of sum variable
        return function() {
					var finalSum = sum;
					for (var i = 0; i < arguments.length; i++) {
		    		finalSum += arguments[i];
					}
					return finalSum;
        };
	};

	global.UAM.addManyValues = addManyValues;

}(window));

/*

Przykład użycia:

var addRest = UAM.addManyValues(2, 3);

addRest(1, 1, 3); // 10
addRest(3, 3); // 11
addRest(1, 1, 1, 1, 1); //10

var addOther = UAM.addManyValues(0, 10, 10);
addOther(10); // 30

*/
