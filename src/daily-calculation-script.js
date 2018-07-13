const fs = require('fs');

const { stageResults } = require('./daily_results_scrape.js');
// console.log(stageResults());

let startlist = fs.readFileSync('startlist2017_flat.json');
startlist = JSON.parse(startlist);

// let stage_results = {
// 	st_winner: "Tony Martin",
// 	yellow: "Mikel Landa",
// 	green: "Geraint Thomas",
// 	polka: "Julien Simon",
// 	white: "Luis Angel Mate",
// 	agressive: "Thomas De Gendt"
// };

let st_results_names = [];
let st_results_codes = [];

function retrieveRiderDetails(rider) {
	st_results_names.push(rider.Rider);
	st_results_codes.push(rider.rider_code);
	if (st_results_names.length === 1) {
		st_results_names.push(rider.Team);
		st_results_codes.push(rider.team_code);
	}
}

function riderLookup(rider) {
	let surname_match = rider.substring((rider.indexOf(' ') + 1), (rider.indexOf(' ') + 6));
	let firstname_match = rider.substring(0, 5);
	// let rider = startlist.riders.find((i) => {
	// 	return i.Rider.includes(match);
	// });
	let riderMatch = [];
	startlist.riders.forEach((i) => {
		let thisRider = i.Rider.toUpperCase();
		if (thisRider.includes(surname_match)) {
			if (thisRider.includes(firstname_match)) {
				riderMatch.push(i);
			}
		}
	});

	switch (riderMatch.length) {
		case 0:
			console.log("Error: no riders found");
			break;
		case 1:
			retrieveRiderDetails(riderMatch[0]);
			break;
		default:
			console.log("Error: more than one rider found");
			break;
	}

}

function output() {
	console.log("Names ouput: " + st_results_names);
	console.log("Codes ouput: " + st_results_codes);
}

function init(result) {

	Object.keys(result).forEach((key, index) => {
		let lookup = result[key];
		riderLookup(lookup);
	});

	output();

}

// init(output);

const promise = stageResults();
promise.then(data => init(data)).catch(e => console.log(e));

