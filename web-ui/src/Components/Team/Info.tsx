import * as React from 'react';
import '../../Style/Team/Info.css';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { getTeamForUserInWeek } from '../../Services/Player/PlayerService';
import { getTotalPointsById, getPointsForUserInWeek } from '../../Services/Points/PointsService';

interface StatsProps {
  weekBeingViewed: number;
  setWeekBeingViewed: (week: number) => void;
  setTeamCache: (user: string, week: number, team: PlayerDTO[]) => void;
  totalNumberOfWeeks: number;

  userBeingViewed: string
  totalPointsCache: { user: { id: string; points: number } }
  setTotalPointsCache: (user: string, points:number) => void;

  weeklyPoints: { user: { weeks: { id: number; points: number } } }
  setWeeklyPointsCache: (user: string, points:number, week:number) => void;
}

interface InfoState {
  dropdownOpen: boolean;
}

class Info extends React.Component<StatsProps, InfoState> {
	constructor (props: StatsProps) {
		super(props);
		this._handleWeekChange = this._handleWeekChange.bind(this);
		this._toggle = this._toggle.bind(this);
		this.updateTotalPointsCache = this.updateTotalPointsCache.bind(this);
		this.updateWeeklyPointsCache = this.updateWeeklyPointsCache.bind(this);
		this.state = {
			dropdownOpen: false
		};
		this.updateTotalPointsCache();
		this.updateWeeklyPointsCache(0);
	}

	componentDidUpdate (prevProps:any, prevState:any, snapshot:any) {
		if (prevProps.userBeingViewed !== this.props.userBeingViewed) {
			this.updateTotalPointsCache();
			this.updateWeeklyPointsCache(0);
		}
	}

	updateWeeklyPointsCache (week: number) {
		if (this.props.userBeingViewed !== '') {
			getPointsForUserInWeek(this.props.userBeingViewed, week).then(response => {
				this.props.setWeeklyPointsCache(this.props.userBeingViewed, response, week);
			}).catch(error => {
				console.log('error = ' + error);
			});
		}
	}

	updateTotalPointsCache () {
		getTotalPointsById(this.props.userBeingViewed).then(response => {
			this.props.setTotalPointsCache(this.props.userBeingViewed, response);
		}).catch(error => {
			console.log('error = ' + error);
		});
	}

	_handleWeekChange (week: number) {
		// SHOULD BE In
		this.props.setWeekBeingViewed(week);
		getTeamForUserInWeek(this.props.userBeingViewed, week).then(response => {
			this.props.setTeamCache(this.props.userBeingViewed, week, response);
		});
	}

	_toggle () {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	render () {
		let allWeeks: number[] = [];
		allWeeks.push(-1);
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
					{week === -1 ? 'Active Team' : 'Week ' + week}
				</DropdownItem>
			</p>
		));

		const { weekBeingViewed, } = this.props;
		const { dropdownOpen } = this.state;
		return (
			<div className="info-columns">
				<div className="total-points">Total Points: {this.props.totalPointsCache[this.props.userBeingViewed]}</div>

				<Dropdown
					isOpen={dropdownOpen}
					toggle={this._toggle}
				>
					{weekBeingViewed === -1
						? 'Active Team'
						: 'Week : ' + weekBeingViewed}
					<DropdownToggle
						caret
						className="week-menu-toggle"
					>
						{' '}
						{' ▼'}
					</DropdownToggle>
					<DropdownMenu className="week-menu">{weekOptions}</DropdownMenu>
				</Dropdown>

				{this.props.weeklyPoints[this.props.userBeingViewed] !== undefined
					? <div className="week-points">Week points : {this.props.weeklyPoints[this.props.userBeingViewed]['week-0']}
					 </div> : <div className="week-points">Week points : </div>
				}

			</div>
		);
	}
}
export default Info;
