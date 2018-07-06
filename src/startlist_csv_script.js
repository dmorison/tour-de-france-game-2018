const fs = require('fs');

let startlist = fs.readFileSync('startlist2018.json');
startlist = JSON.parse(startlist);
// console.log(startlist);

let riders = [];

startlist.teams.forEach((item) => {
	
	item.riders.forEach((i) => {
		// console.log(i);
		let rider = {};
		rider["Team"] = item.team_name;
		rider["team_code"] = item.team_code;
		rider["rider_code"] = i.rider_code;
		rider["Rider"] = i.rider_name;
		// console.log(rider);
		riders.push(rider);
	});

});

console.log(riders);
let json = JSON.stringify(riders);
// console.log(json);

fs.writeFile('startlist2018_flat.json', json);