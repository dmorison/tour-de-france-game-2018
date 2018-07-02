const fs = require('fs');

let startlist = [
  'AG2R La Mondiale, Romain Bardet, Silvan Dillier, Axel Domont, Tony Gallopin, Mathias Frank, Oliver Naesen, Pierre Latour, Alexis Vuillermoz',
  'Astana Pro Team, Jakob Fuglsang, Luis León Sánchez, Dmitriy Gruzdev, Magnus Cort, Omar Fraile, Jesper Hansen, Tanel Kangert, Michael Valgren Andersen',
  'Bahrain Merida Pro Cycling Team, Vincenzo Nibali, Domenico Pozzovivo, Gorka Izagirre, Ion Izagirre, Sonny Colbrelli, Heinrich Haussler, Kristijan Koren, Franco Pellizotti',
  'BMC Racing Team, Richie Porte, Greg Van Avermaet, Tejay Van Garderen, Patrick Bevin, Damiano Caruso, Simon Gerrans, Stefan Küng, Michael Schär',
  'BORA – hansgrohe, Peter Sagan, Maciej Bodnar, Markus Burghardt, Rafal Majka, Gregor Mühlberger, Daniel Oss, Pawel Poljanski, Lukas Pöstlberger',
  'Dimension Data, Mark Cavendish, Edvald Boasson Hagen, Tom-Jelte Slagter, Reinardt J. van Rensburg, Serge Pauwels, Mark Renshaw, Jay Thomson, Julien Vermote',
  'Groupama – FDJ, Arnaud Démare, Ramon Sinkeldam, David Gaudu, Jacopo Guarnieri, Olivier Le Gac, Tobias Ludvigsson, Rudy Molard, Arthur Vichot',
  'LottoNL-Jumbo, Robert Gesink, Dylan Groenewegen, Steven Kruijswijk, Primoz Roglic, Amund Grøndahl Jansen, Paul Martens, Timo Roosen, Antwan Tolhoek',
  'Mitchelton-Scott, Adam Yates, Mikel Nieve, Jack Bauer, Luke Durbridge, Mathew Hayman, Michael Hepburn, Damien Howson, Daryl Impey',
  'Movistar Team, Alejandro Valverde, Mikel Landa, Nairo Quintana, José Joaquin Rojas, Marc Soler, Andrey Amador, Daniele Bennati, Imanol Erviti',
  'New Lotto Soudal, André Greipel, Tiesj Benoot, Jasper De Buyst, Thomas De Gendt,  Jens Keukeleire,Tomasz Marczsynski, Marcel Sieberg, Jelle Vanendert',
  'Quick-Step Floors, Bob Jungels, Julian Alaphilippe, Tim Declercq, Fernando Gaviria, Philippe Gilbert, Yves Lampaert, Maximiliano Richeze, Niki Terpstra',
  'Team EF Education First-Drapac p/b Cannondale, Rigoberto Uran, Sep Vanmarcke, Taylor Phinney, Pierre Rolland, Simon Clarke, Lawson Craddock, Daniel Felipe Martínez, Tom Scully',
  'Team Katusha – Alpecin, Ian Boswell, Tony Martin, Ilnur Zakarin, Marcel Kittel, Robert Kišerlovski, Pavel Kochetkov, Nils Politt, Rick Zabel',
  'Team Sky, Chris Froome, Gianni Moscon, Geraint Thomas, Michal Kwiatkowski, Wout Poels, Egan Bernal, Jonathan Castroviejo',
  'Team Sunweb , Tom Dumoulin, Laurens ten Dam, Michael Matthews, Søren Kragh Andersen, Nikias Arndt, Simon Geschke, Chad Haga, Edward Theuns',
  'Trek – Segafredo, Bauke Mollema, John Degenkolb, Koen de Kort, Jasper Stuyven, Julien Bernard, Michael Gogl, Tsgabu Grmay, Toms Skujiņš',
  'UAE-Team Emirates, Daniel Martin, Alexander Kristoff, Darwin Atapuma, Kristijan Durasek, Roberto Ferrari, Marco Marcato, Rory Sutherland, Oliviero Troia',
  'Cofidis - Solutions Crédits, Christophe Laporte, Dimitri Claeys, Nicolas Edet, Jésus Herrada, Daniel Navarro, Anthony Perez, Julien Simon, Anthony Turgis',
  'Direct Energie, Lilian Calmejane, Thomas Boudat, Sylvain Chavanel, Jérôme Cousin, Damien Gaudin, Fabien Grellier, Romain Sicard, Rein Taaramäe',
  'Fortuneo – Samsic, Warren Barguil, Brice Feillu, Amaël Moinard, Elie Gesbert',
  'Wanty – Groupe Gobert, Thomas Degand, Timothy Dupont, Guillaume Martin, Marco Minnaard, Yoann Offredo, Andrea Pasqualon, Dion Smith, Guillaume Van Keirsbulck',
];

let startlist_json = {};
let teams = [];

startlist.forEach((item, index) => {
  let team = {};
  let thisTeam = item.split(',');
  let teamName = thisTeam[0];
  let teamCode = "";

  let teamNumber = index < 10 ? '0' + index : index;

  let riders = [];
  for(let i = 1; i < thisTeam.length; i++) {
    let rider = {};
    rider["rider_name"] = thisTeam[i].trim();
    rider["rider_code"] = 'rd' + teamNumber + i;
    console.log(rider);
    riders.push(rider);
  }
  team["team_name"] = teamName;
  team["team_code"] = teamCode;
  team["riders"] = riders;

  teams.push(team);
});

let obj = {
  teams: teams
}

let json = JSON.stringify(obj);
console.log(json);

fs.writeFile('startlist2018.json', json);
