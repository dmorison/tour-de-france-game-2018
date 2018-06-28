import React, { Component } from 'react';

import startList from './teams-start-list.json';

class App extends Component {
	constructor(props) {
		super(props);

		this.renderRiders = this.renderRiders.bind(this);
		this.handleTeamSelect = this.handleTeamSelect.bind(this);
		this.handleRiderSelect = this.handleRiderSelect.bind(this);
		this.handleLeadRiderSelect = this.handleLeadRiderSelect.bind(this);
		// this.handleTeamDisabled = this.handleTeamDisabled.bind(this);

		this.state = {
			team: null,
			lead_rider_1: {
				rider_team: null,
				rider_name: null
			},
			lead_rider_2: {
				rider_team: null,
				rider_name: null
			},
			rider_3: null,
			rider_4: null,
			rider_5: null,
			rider_6: null
		}
	}

	handleTeamSelect(event) {
		console.log(event.target.value);
		!this.state.team ? this.setState({ team: event.target.value }) : this.setState({ team: null });
	}

	handleRiderSelect(event) {
		console.log('domestique: ' + event.target.value);
	}

	handleLeadRiderSelect(rider, team) {
		console.log('lead rider: ' + rider + ' rider team: ' + team);
		switch (rider) {
			case this.state.lead_rider_1.rider_name:
				this.setState({
					leade_rider_1: {
						rider_team: null,
						rider_name: null
					}
				});
				break;
			case this.state.lead_rider_2.rider_name:
				this.setState({
					leade_rider_2: {
						rider_team: null,
						rider_name: null
					}
				});
				break;
		}

		if (this.state.lead_rider_1.rider_name !== rider && this.state.lead_rider_1.rider_name) {
			this.setState({
				lead_rider_1: {
					rider_team: team,
					rider_name: rider
				}
			});
		} else if (!this.state.lead_rider_2.rider_name) {
			this.setState({
				lead_rider_2: {
					rider_team: team,
					rider_name: rider
				}
			});
		}
	}

	// handleTeamDisabled() {
	// 	console.log(rider_code);
	// }

	renderRiders() {
		const teams = startList.teams;
		console.log(teams);
		return teams.map((team, index) => {
			return (
				<div className="team-item">
					<label className="team-name">
						<input
							type="checkbox"
							id={team.team_code}
							value={team.team_code}
							onChange={this.handleTeamSelect}
							disabled={this.state.lead_rider_1.rider_team === team.team_code || this.state.lead_rider_2.rider_team === team.team_code}
						/>
						{team.team_name}
					</label>
					<div>
						{
							team.riders.map((rider, index) => {
								{/*console.log(team.team_code);*/}
								return (
									<label className="rider-name">
										<input
											type="checkbox"
											id={rider.rider_code}
											value={rider.rider_code}
											onChange={index === 0 ? (a, b) => this.handleLeadRiderSelect(rider.rider_code, team.team_code) : this.handleRiderSelect}
											disabled={index === 0 ? this.state.team === team.team_code : null}
										/>
										{rider.rider_name}
									</label>
								);
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
