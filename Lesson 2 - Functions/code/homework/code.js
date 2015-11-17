(function (global) {
	var mapArray;

	if (!global.UAM) {
		global.UAM = {};
	}

    global.UAM.aircrafts = [];

    //////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// Sample aircraft with sample service  ///////////////

    global.UAM.aircrafts.push({
        code: 'SP-ABC',
        services: []
    });

    global.UAM.aircrafts[0].services.push({
        name: 'smth1',
        timeToExecute: 120
    });

    //////////////////////////////////////////////////////////////////////////////////////

    global.UAM.addAircraft = function (newAircraftCode) {
        var aircraft = {
					code: newAircraftCode,
					services: []
				};
				global.UAM.aircrafts.push(aircraft);
				return aircraft;
    };

    global.UAM.removeAircraft = function (aircraftObj) {
        var index = global.UAM.aircrafts.indexOf(aircraftObj);
				if (index > -1) {
				    global.UAM.aircrafts.splice(index, 1);
				}
    };

    global.UAM.addWorkToAircraft = function(aircraftObj, name, timeToExxecute) {
        var index = global.UAM.aircrafts.indexOf(aircraftObj);
				global.UAM.aircrafts[index].services.push({
					name: name,
					timeToExecute: timeToExxecute
				});
    };

    global.UAM.reduceTimeToExecute = function(time) {
			global.UAM.aircrafts.forEach(function(aircraft) {
				aircraft.services.forEach(function(service) {
					service.timeToExecute = service.timeToExecute - time;
				});
			});
    };

    global.UAM.getAircraftsForRepairs = function(maxTimeToExecute) {
			return global.UAM.aircrafts.filter(function (aircraft) {
				return aircraft.services.length > 0;
			});
    };
}(window));



var bindEvents = function() {
	var addAircraftButton = document.getElementById("aircraft__code-submit");

	var updateUI = function() {
		var aircraftsNumberElement = document.getElementById("aircrafts__number");
		var aircraftsSection = document.getElementById("aircrafts");

		var aircraftsElements = [];
		UAM.aircrafts.forEach(function(aircraft) {
			aircraftsElements.push(
				"<div class='aircraft'>" +
				"<div class='aircraft__code'>" + aircraft.code + "</div>" +
				"<button class='aircraft__remove-btn' data-aircraft-index='" + UAM.aircrafts.indexOf(aircraft) + "'>Remove aircraft</button>"
				+ "<div class='aicraft__work'>"
				+ "</div>"
				+ "</div>"
			);
		});

		aircraftsNumberElement.innerHTML = "Aircrafts count: " + String(UAM.aircrafts.length);
		aircraftsSection.innerHTML = aircraftsElements.join('');

		var removeAircraftButtons = document.getElementsByClassName("aircraft__remove-btn");
		for(var i = 0; i < removeAircraftButtons.length; i++) {
			removeAircraftButtons[i].addEventListener("click", function(e) {
				var aircraftIndex = e.target.dataset.aircraftIndex;
				var aircraftToRemove = UAM.aircrafts[aircraftIndex];
				UAM.removeAircraft(aircraftToRemove);
				updateUI();
			});
		}
	};

	addAircraftButton.addEventListener("click", function(e) {
		var code = document.getElementById("aircraft__code-input").value;
		if(code === '') {
			alert("Code can't be blank!");
			return;
		}
		UAM.addAircraft(code);
		updateUI();
	});

	updateUI();

};

document.addEventListener('DOMContentLoaded', bindEvents, false);

/*

Przykład użycia:

var newAircraft1 = addAircraft('SP-XY1');
var newAircraft2 = addAircraft('SP-XY2');

addWorkToAircraft(newAircraft1, 'serviceXY1a', 110);
addWorkToAircraft(newAircraft1, 'serviceXY1b', 130);
reduceTimeToExecute(newAircraft1, 20);

var sxy2a = addWorkToAircraft(newAircraft2, 'serviceXY2a', 130);
var sxy2b = addWorkToAircraft(newAircraft2, 'serviceXY2b', 160);
reduceTimeToExecute(newAircraft2, 20);

getAircraftsForRepairs(100); // [ newAircraft1 ]

removeAircraft(newAircraft1);

getAircraftsForRepairs(100); // []

reduceTimeToExecute(newAircraft2, 20);

getAircraftsForRepairs(100); // [ newAircraft2 ]

*/
