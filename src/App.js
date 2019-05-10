import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import startList from './startlist2018.json';

class App extends Component {
	constructor(props) {
		super(props);

		this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

		this.findTeamName = this.findTeamName.bind(this);
		this.findRiderName = this.findRiderName.bind(this);

		this.state = {
			show: false,
			team: null,
			lead_rider_1: null,
			lead_rider_2: null,
			rider_3: null,
			rider_4: null,
			rider_5: null,
			rider_6: null,
		}
	}

	handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

	findTeamName() {
		let toFind = this.state.team;
		if (toFind) {
			let selectedTeam = startList.teams.find(function(item) {
				return item.team_code === toFind;
			});
			return selectedTeam.team_name;
		} else {
			return null;
		}
	}

	findRiderName(rider) {
		let toFind = rider;
		if (toFind) {
			let selectedRider = null;
			for (let team of startList.teams) {
				selectedRider = team.riders.find(function(rider) {
					return rider.rider_code === toFind;
				});
				if (selectedRider) { break; }
			};
			return selectedRider.rider_name;
		} else {
			return null;
		}
	}

	handleTeamSelect(team, leadRider) {
		let teamSelect = this.state.team;

		switch (leadRider) {
			case this.state.lead_rider_1:
			case this.state.lead_rider_2:
				alert("You cannot chose a team for which you already have a lead rider from");
				break;
			default:
				!teamSelect ? (teamSelect = team) : alert("You already selected a team");
		}

		this.setState({
			team: teamSelect,
			show: true
		});
	}

	handleRemoveTeam() {
		this.setState({ team: null });
	}

	handleLeadRiderSelect(rider, team) {
		let leadrider_1 = this.state.lead_rider_1;
		let leadrider_2 = this.state.lead_rider_2;

		if (this.state.team === team) {
			alert("You cannot choose a lead rider from the team you've chosen as your team");
			return;
		}

		if (leadrider_1 === rider || leadrider_2 === rider) {
			alert("You already have this rider selected");
		} else if (!leadrider_1) {
			leadrider_1 = rider;
		} else if (!leadrider_2) {
			leadrider_2 = rider;
		} else {
			alert("You already have two lead riders");
		}

		this.setState({
			lead_rider_1: leadrider_1,
			lead_rider_2: leadrider_2,
			show: true
		});
	}

	handleRemoveLeadRider(x) {
		let leadRider = `lead_rider_${x}`;
		this.setState({ [leadRider]: null });
	}

	handleRiderSelect(rider) {
		let rider_3 = this.state.rider_3;
		let rider_4 = this.state.rider_4;
		let rider_5 = this.state.rider_5;
		let rider_6 = this.state.rider_6;

		switch (rider) {
			case rider_3:
			case rider_4:
			case rider_5:
			case rider_6:
				alert("You already have this rider selected");
				break;
			default:
				if (!rider_3) {
					rider_3 = rider;
				} else if (!rider_4) {
					rider_4 = rider;
				} else if (!rider_5) {
					rider_5 = rider;
				} else if (!rider_6) {
					rider_6 = rider;
				} else {
					alert("You already have all your riders, please unselect one before choosing another");
				}
				break;
		}

		this.setState({
			rider_3: rider_3,
			rider_4: rider_4,
			rider_5: rider_5,
			rider_6: rider_6,
			show: true
		});
	}

	handleRemoveRider(x) {
		let rider = `rider_${x}`;
		this.setState({ [rider]: null });
	}

	renderRiders = () => {
		const teams = startList.teams;

		return teams.map((team, index) => {
			return (
				<div className="team-item" key={team.team_code}>
					<div>
						<a
							href="#"
							id={team.team_code}
							className="team-name"
							onClick={() => this.handleTeamSelect(team.team_code, team.riders[0].rider_code)}
						>
							{team.team_name}
						</a>
					</div>
					<div>
						{
							team.riders.map((rider, index) => {
								if (index === 0) {
									return (
										<a
											href="#"
											id={rider.rider_code}
											className="rider-name"
											key={rider.rider_code}
											onClick={() => this.handleLeadRiderSelect(rider.rider_code, team.team_code)}
										>
											{rider.rider_name}
										</a>
									);
								} else {
									return (
										<a
											href="#"
											id={rider.rider_code}
											className="rider-name"
											key={rider.rider_code}
											onClick={() => this.handleRiderSelect(rider.rider_code)}
										>
											{rider.rider_name}
										</a>
									);
								}
							})
						}
					</div>
				</div>
			);
		});
	}

	renderPlayerSelection = (isModal) => {
		let thisTeam = this.state;
		return (
			<div className="player-selection">
	  		<table>
	  			<tbody>
	      		<tr>
	      			<td>Team:</td>
	      			<td>{this.findTeamName()}</td>
							{this.state.team ? <td><a href="#" title="Remove" className="remove" onClick={() => this.handleRemoveTeam()}> x </a></td> : null}
	      		</tr>
	      		<tr>
	      			<td>Lead rider 1:</td>
	      			<td>{this.findRiderName(this.state.lead_rider_1)}</td>
							{this.state.lead_rider_1 ? <td><a href="#" title="Remove" className="remove" onClick={() => this.handleRemoveLeadRider(1)}> x </a></td> : null}
	      		</tr>
	      		<tr>
	      			<td>Lead rider 2:</td>
	      			<td>{this.findRiderName(this.state.lead_rider_2)}</td>
							{this.state.lead_rider_2 ? <td><a href="#" title="Remove" className="remove" onClick={() => this.handleRemoveLeadRider(2)}> x </a></td> : null}
	      		</tr>
	      		<tr>
	      			<td>Rider 3:</td>
	      			<td>{this.findRiderName(this.state.rider_3)}</td>
							{this.state.rider_3 ? <td><a href="#" title="Remove" className="remove" onClick={() => this.handleRemoveRider(3)}> x </a></td> : null}
	      		</tr>
	      		<tr>
	      			<td>Rider 4:</td>
	      			<td>{this.findRiderName(this.state.rider_4)}</td>
							{this.state.rider_4 ? <td><a href="#" title="Remove" className="remove" onClick={() => this.handleRemoveRider(4)}> x </a></td> : null}
	      		</tr>
	      		<tr>
	      			<td>Rider 5:</td>
	      			<td>{this.findRiderName(this.state.rider_5)}</td>
							{this.state.rider_5 ? <td><a href="#" title="Remove" className="remove" onClick={() => this.handleRemoveRider(5)}> x </a></td> : null}
	      		</tr>
	      		<tr>
	      			<td>Rider 6:</td>
	      			<td>{this.findRiderName(this.state.rider_6)}</td>
							{this.state.rider_6 ? <td><a href="#" title="Remove" className="remove" onClick={() => this.handleRemoveRider(6)}> x </a></td> : null}
	      		</tr>
	      	</tbody>
	  		</table>
	  		{
	  			(thisTeam.team && thisTeam.lead_rider_1 && thisTeam.lead_rider_2 && thisTeam.rider_3 && thisTeam.rider_4 && thisTeam.rider_5 && thisTeam.rider_6 && isModal) ?
	  			<p className="redText"><i><strong>IMPORTANT:</strong> When you are finished selecting your team please copy the code in the yellow highlight at the bottom of the page and send it to me in an email, thanks!</i></p> :
	  			null
	  		}
	  	</div>
	  );
	}

  render() {
    return (
      <div className="App">
      	<p className="redText"><i><strong>IMPORTANT:</strong> When you are finished selecting your team please copy the code in the yellow highlight at the bottom of the page and send it to me in an email, thanks!</i></p>
      	{this.renderPlayerSelection(false)}
      	<form>
      		<div className="teams-wrapper">
      	 		{this.renderRiders()}
      	 	</div>
      	 	<p className="redText">Copy and paste this yellow highlighted code block and email to me:</p>
	      	<code className="code-block">
	      		<div>
	      		{
	      			`names: ["${this.findTeamName()}", "${this.findRiderName(this.state.lead_rider_1)}",
	      			"${this.findRiderName(this.state.lead_rider_2)}", "${this.findRiderName(this.state.rider_3)}",
	      			"${this.findRiderName(this.state.rider_4)}", "${this.findRiderName(this.state.rider_5)}",
	      			"${this.findRiderName(this.state.rider_6)}"]`
	      		}
	      		</div>
	      		<div>
	      		{
	      			`codes: ["${this.state.team}", "${this.state.lead_rider_1}", "${this.state.lead_rider_2}",
	      			"${this.state.rider_3}", "${this.state.rider_4}", "${this.state.rider_5}",
	      			"${this.state.rider_6}"]`
	      		}
	      		</div>
	      	</code>
      	</form>
      	<Modal show={this.state.show} onHide={this.handleClose}>
      		{this.renderPlayerSelection(true)}
	      	<Button onClick={this.handleClose}>Close</Button>
	      </Modal>
      </div>
    );
  }
}

export default App;
