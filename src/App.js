import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import startList from './startlist2018.json';

class App extends Component {
	constructor(props) {
		super(props);

		this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.renderPlayerSelection = this.renderPlayerSelection.bind(this);
		this.renderRiders = this.renderRiders.bind(this);
		this.handleTeamSelect = this.handleTeamSelect.bind(this);
		this.handleRiderSelect = this.handleRiderSelect.bind(this);
		this.handleLeadRiderSelect = this.handleLeadRiderSelect.bind(this);

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

	handleLeadRiderSelect(event) {
		let leadrider_1 = this.state.lead_rider_1;
		let leadrider_2 = this.state.lead_rider_2;

		switch (event.target.id) {
			case leadrider_1:
				leadrider_1 = null;
				break;
			case leadrider_2:
				leadrider_2 = null;
				break;
			default:
				if (!leadrider_1) {
					leadrider_1 = event.target.id;
				} else if (!leadrider_2) {
					leadrider_2 = event.target.id;
				} else {
					alert("You already have 2 lead riders, please unselect one before choosing another");
				}
				break;
		}

		this.setState({
			lead_rider_1: leadrider_1,
			lead_rider_2: leadrider_2
		}, () => this.handleShow());
	}

	handleRiderSelect(event) {
		let rider_3 = this.state.rider_3;
		let rider_4 = this.state.rider_4;
		let rider_5 = this.state.rider_5;
		let rider_6 = this.state.rider_6;

		switch (event.target.id) {
			case rider_3:
				rider_3 = null;
				break;
			case rider_4:
				rider_4 = null;
				break;
			case rider_5:
				rider_5 = null;
				break;
			case rider_6:
				rider_6 = null;
				break;
			default:
				if (!rider_3) {
					rider_3 = event.target.id;
				} else if (!rider_4) {
					rider_4 = event.target.id;
				} else if (!rider_5) {
					rider_5 = event.target.id;
				} else if (!rider_6) {
					rider_6 = event.target.id;
				} else {
					alert("You already have all your riders, please unselect one before choosing another");
				}
				break;
		}

		this.setState({
			rider_3: rider_3,
			rider_4: rider_4,
			rider_5: rider_5,
			rider_6: rider_6
		}, () => this.handleShow());
	}

	handleTeamSelect(event) {
		if (this.state.team === event.target.id) {
			this.setState({ team: null }, () => this.handleShow());
		} else {
			!this.state.team ? this.setState({ team: event.target.id }, () => this.handleShow()) : alert("You already have a team selected, please unselect your team to choose another one");
		}
	}

	renderRiders() {
		const teams = startList.teams;

		return teams.map((team, index) => {
			return (
				<div className="team-item" key={team.team_code}>
					<div>
						<a
							href="#"
							id={team.team_code}
							className="team-name"
							onClick={this.handleTeamSelect}
						>
							{team.team_name}
						</a>
						<span className="warning-msg"><i>(remember you can't select both the team and team leader)</i></span>
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
											onClick={this.handleLeadRiderSelect}
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
											onClick={this.handleRiderSelect}
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

	renderPlayerSelection(isModal) {
		let thisTeam = this.state;
		return (
			<div className="player-selection">
	  		<table>
	  			<tbody>
	      		<tr>
	      			<td>Team:</td>
	      			<td>{this.findTeamName()}</td>
	      		</tr>
	      		<tr>
	      			<td>Lead rider 1:</td>
	      			<td>{this.findRiderName(this.state.lead_rider_1)}</td>
	      		</tr>
	      		<tr>
	      			<td>Lead rider 2:</td>
	      			<td>{this.findRiderName(this.state.lead_rider_2)}</td>
	      		</tr>
	      		<tr>
	      			<td>Rider 3:</td>
	      			<td>{this.findRiderName(this.state.rider_3)}</td>
	      		</tr>
	      		<tr>
	      			<td>Rider 4:</td>
	      			<td>{this.findRiderName(this.state.rider_4)}</td>
	      		</tr>
	      		<tr>
	      			<td>Rider 5:</td>
	      			<td>{this.findRiderName(this.state.rider_5)}</td>
	      		</tr>
	      		<tr>
	      			<td>Rider 6:</td>
	      			<td>{this.findRiderName(this.state.rider_6)}</td>
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
