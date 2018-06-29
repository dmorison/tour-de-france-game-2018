import React, { Component } from 'react';

import startList from './teams-start-list.json';

class App extends Component {
	constructor(props) {
		super(props);

		this.renderRiders = this.renderRiders.bind(this);
		this.handleTeamSelect = this.handleTeamSelect.bind(this);
		this.handleRiderSelect = this.handleRiderSelect.bind(this);
		this.handleLeadRiderSelect = this.handleLeadRiderSelect.bind(this);

		this.state = {
			team: null,
			lead_rider_1: null,
			lead_rider_2: null,
			rider_3: null,
			rider_4: null,
			rider_5: null,
			rider_6: null
		}
	}

	handleLeadRiderSelect(event) {
		console.log(event.target.id);
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
					console.log("Sorry you already have 2 lead riders");
				}
				break;
		}

		this.setState({
			lead_rider_1: leadrider_1,
			lead_rider_2: leadrider_2
		});
	}

	handleRiderSelect(event) {
		console.log(event.target.id);
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
					console.log("You already have all your riders");
				}
				break;
		}

		this.setState({
			rider_3: rider_3,
			rider_4: rider_4,
			rider_5: rider_5,
			rider_6: rider_6
		});
	}

	handleTeamSelect(event) {
		console.log(event.target.id);
		if (this.state.team === event.target.id) {
			this.setState({ team: null });
		} else {
			!this.state.team ? this.setState({ team: event.target.id }) : console.log("you already have a team selected");
		}
	}

	renderRiders() {
		const teams = startList.teams;
		console.log(teams);

		return teams.map((team, index) => {
			return (
				<div className="team-item">
					<div>
						<a
							href="#"
							id={team.team_code}
							onClick={this.handleTeamSelect}
						>
							{team.team_name}
						</a>
					</div>
					<div>
						{
							team.riders.map((rider, index) => {
								{/*console.log(team.team_code);*/}
								if (index === 0) {
									return (
										<div className="rider-name">
											<a
												href="#"
												id={rider.rider_code}
												onClick={this.handleLeadRiderSelect}
											>
												{rider.rider_name}
											</a>
										</div>
									);
								} else {
									return (
										<div className="rider-name">
											<a
												href="#"
												id={rider.rider_code}
												onClick={this.handleRiderSelect}
											>
												{rider.rider_name}
											</a>
										</div>
									);
								}
							})
						}
					</div>
				</div>
			);
		});
	}

  render() {
    return (
      <div className="App">
      	<div>
      		Player name: <br/>
      		Team: {this.state.team} <br/>
      		Lead rider 1: {this.state.lead_rider_1} <br/>
      		Lead rider 2: {this.state.lead_rider_2} <br/>
      		Rider 3: {this.state.rider_3} <br/>
      		Rider 4: {this.state.rider_4} <br/>
      		Rider 5: {this.state.rider_5} <br/>
      		Rider 6: {this.state.rider_6} <br/>
      	</div>
      	<form>
      		<div className="teams-wrapper">
      	 		{this.renderRiders()}
      	 	</div>
      	</form>
      </div>
    );
  }
}

export default App;
