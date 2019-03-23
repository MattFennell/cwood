/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
import { PlayerStatsDTO } from './PlayerStatsType';
import { PlayerPointsDTO } from './PlayerPointsType';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

interface PlayerStatsProps {
	handleWeek: (week:number) => void;
    playerStatsBeingViewed: PlayerStatsDTO;
    playerPointsViewed: boolean;
    playerPointsBeingViewed: PlayerPointsDTO;
	statsBeingViewed: boolean;
	totalNumberOfWeeks: number;
	weekBeingViewed: number;
}

interface PlayerStatsState {
	dropdownOpen: boolean;
  }

// eslint-disable-next-line react/require-optimization
class PlayerStats extends React.Component<PlayerStatsProps, PlayerStatsState> {
	constructor (props: PlayerStatsProps) {
		super(props);
		this._handleWeekChange = this._handleWeekChange.bind(this);
		this._toggle = this._toggle.bind(this);
		this.state = {
			dropdownOpen: false
		};
	}

	_handleWeekChange (week:number) {
		this.props.handleWeek(week);
	}

	_toggle () {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	render () {
		let totalStats: JSX.Element[] = [];

		let info: String[] = ['First name', 'Surname', 'Position', 'Total points', 'Price', 'Total Goals', 'Total Assists'];
		let index: number = -1;

		for (const [key, value] of Object.entries(this.props.playerStatsBeingViewed)) {
			index += 1;
			totalStats.push(<tr
				className="player-stats"
				key={key}
			                >
				<td className="stat-title">{info[index]}</td>
				<td className="stat-value">{value}</td>
			</tr>);
		  }

		totalStats.push(<hr />);
		let weeklyInfo: String[] = ['Weekly Goals', 'Weekly Assists', 'Man of the Match', 'Yellow Cards', 'Red Card'];
		let weeklyIndex:number = -1;
		for (const [key, value] of Object.entries(this.props.playerPointsBeingViewed)) {
			if (key !== 'week') {
				weeklyIndex += 1;
				totalStats.push(<tr
					className="player-stats"
					key={key}
				                >
					<td className="stat-title">{weeklyInfo[weeklyIndex]}</td>
					<td className="stat-value">{value}</td>
				</tr>);
			}
		  }

		const allWeeks: number[] = [];
		  for (let x = 0; x <= this.props.totalNumberOfWeeks; x++) {
			  allWeeks.push(x);
		  }
		  const weekOptions = allWeeks.map(week => (
			<p
				className="team-menu-items"
				key={week}
			>
				<DropdownItem
					className={'week-menu-item-' + (week === this.props.weekBeingViewed)}
					key={week}
					onClick={() => this._handleWeekChange(week)}
					value={week}
				>
					{'Week ' + week}
				</DropdownItem>
			</p>
		));

		totalStats.push(<tr
			className="player-stats"
			key="week"
		                >
			<td className="stat-title">Week</td>
			<td className="stat-value">{<Dropdown
				isOpen={this.state.dropdownOpen}
				toggle={this._toggle}
			                            >
				<DropdownToggle
					caret
					className="sidebar-stats-menu-toggle"
				>
					{this.props.weekBeingViewed}
					{' '}
					{' ▼'}
				</DropdownToggle>
				<DropdownMenu className="week-menu">{weekOptions}</DropdownMenu>
			</Dropdown>}</td>
		</tr>);

		return (
			<div
				className="player-stats-sidebar"
			>
				{this.props.statsBeingViewed ? (
					<div className="stats-wrapper">

						<table>
							<tbody> {totalStats} </tbody>
						</table>

						<div className="no-stats-message">

							{!this.props.playerPointsViewed ? (<div>No stats for {this.props.playerStatsBeingViewed.firstName}{' '}
								{this.props.playerStatsBeingViewed.surname} in week {this.props.weekBeingViewed} </div>) : (<div />)}

						</div>

					</div>
				)
				 : (<div className="click-player-message"> Click on a player to view their stats </div>)}

			</div>
		);
	}
}

export default PlayerStats;