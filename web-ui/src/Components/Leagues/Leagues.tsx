import * as React from 'react';
import '../../Style/League/League.css';
import {
	getPositionsOfUsersInLeague,
	getLeagueAdmin,
	getLeaguesAndPositions
} from '../../Services/League/LeagueService';
import { LeaguePositions } from '../../Models/Interfaces/LeaguePositions';
import LeagueTableBody from './LeagueTableBody';
import { Button, Container } from 'reactstrap';
import { Row, Col } from 'react-bootstrap';
import CreateLeague from './CreateLeague';
import JoinLeague from './JoinLeague';
import RankingsTableBody from './RankingsTableBody';
import { UserLeaguePosition } from '../..//Models/Interfaces/UserLeaguePosition';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';

interface LeagueProps {
  leagueCache: any;
  leaguePageBeingViewed: string;
  leagueRankings: UserLeaguePosition[];
  isAdmin: boolean;
  leagueCode: string;

  addToLeagueCache: (leagueName: string, position: number) => void;
  setLeaguePageBeingViewed: (leaguePageBeingViewed: string) => void;
  setLeagueRankings: (leagueRankings: UserLeaguePosition[]) => void;
  setIsLeagueAdmin: (isAdmin: boolean) => void;
  setLeagueCode: (code: string) => void;

  setPageBeingViewed: (page: string) => void;
  setUserBeingViewed: (user: string) => void;
}

interface LeaguesState {
}

class Leagues extends React.Component<RoutedFormProps<RouteComponentProps> & LeagueProps, LeaguesState> {
	constructor (props: RoutedFormProps<RouteComponentProps> & LeagueProps) {
		super(props);
		this._setLeagueBeingViewed = this._setLeagueBeingViewed.bind(this);
		this.handleCreateLeague = this.handleCreateLeague.bind(this);
		this.handleJoinLeague = this.handleJoinLeague.bind(this);
		this.handleViewUser = this.handleViewUser.bind(this);
	}

	componentDidMount () {
		getLeaguesAndPositions().then(leagueAndPositionsArray => {
			for (let x = 0; x < leagueAndPositionsArray.length; x++) {
				if (this.props.leagueCache[leagueAndPositionsArray[x].leagueName] === undefined) {
					this.props.addToLeagueCache(
						leagueAndPositionsArray[x].leagueName,
						leagueAndPositionsArray[x].position
					);
				}
			}
		});
	}

	_setLeagueBeingViewed (leagueToView: string) {
		// TO:DO - Combine into one request?
		const { setLeagueRankings, setLeaguePageBeingViewed } = this.props;

		setLeaguePageBeingViewed(leagueToView);
		getPositionsOfUsersInLeague(leagueToView).then(leagueRankings => {
			setLeagueRankings(leagueRankings);
		});

		getLeagueAdmin(leagueToView).then(response => {
			this.props.setIsLeagueAdmin(response.userIsAdmin);
			this.props.setLeagueCode(response.code);
		});
	}

	handleCreateLeague () {
		const { setLeaguePageBeingViewed } = this.props;
		setLeaguePageBeingViewed('create-league');
	}

	handleJoinLeague () {
		const { setLeaguePageBeingViewed } = this.props;
		setLeaguePageBeingViewed('join-league');
	}

	handleViewUser (id: string) {
		this.props.setUserBeingViewed(id);
		this.props.setPageBeingViewed('Team');
		this.props.history.push('/team');
	}

	render () {
		let leagues: LeaguePositions[] = [];
		var keys = Object.keys(this.props.leagueCache);
		for (let x = 0; x < keys.length; x++) {
			// TO:DO - Check this
			let p: LeaguePositions = {
				leagueName: keys[x],
				position: this.props.leagueCache[keys[x]],
				id: this.props.leagueCache[keys[x]]
			};
			leagues.push(p);
		}

		const offSet = this.props.leaguePageBeingViewed === 'home' ? 0 : 0;
		const width = this.props.leaguePageBeingViewed === 'home' ? 6 : 6;

		return (
			<Container>
				<Row>
					<Col
						className="my-leagues-column-one"
						lg={width}
						lgOffset={offSet}
						md={width}
						mdOffset={offSet}
						xs={width}
						xsOffset={offSet}
					>
						<div className="outer-league-rows">
							<div className="my-leagues">
                				My Leagues
								<div className="league-table">
									<LeagueTableBody
										leagues={leagues}
										setLeagueBeingViewed={this._setLeagueBeingViewed}
									/>
								</div>
							</div>

							<div>
								<div className="flex-container-two">
									<div className="create league">
										<div className="create-league-button">
											<Button
												className="btn btn-default btn-round-lg btn-lg first"
												id="btnCreateLeague"
												onClick={this.handleCreateLeague}
												type="submit"
											>
                        					Create league
											</Button>
										</div>
									</div>
									<div className="join-league">
										<div className="join-league-button">
											<Button
												className="btn btn-default btn-round-lg btn-lg first"
												id="btnJoinLeague"
												onClick={this.handleJoinLeague}
												type="submit"
											>
                        					Join league
											</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</Col>
					{this.props.leaguePageBeingViewed === 'create-league'
						? <CreateLeague addToLeagueCache={this.props.addToLeagueCache} />
						: this.props.leaguePageBeingViewed === 'join-league'
							? <JoinLeague addToLeagueCache={this.props.addToLeagueCache} />
							: this.props.leaguePageBeingViewed !== 'home'
								? <RankingsTableBody
									code={this.props.leagueCode}
									handleViewUser={this.handleViewUser}
									isAdmin={this.props.isAdmin}
									leagueBeingViewed={this.props.leaguePageBeingViewed}
									leagueRankings={this.props.leagueRankings}
								  />
								: null}
				</Row>
			</Container>
		);
	}
}
export default withRouter(Leagues);
