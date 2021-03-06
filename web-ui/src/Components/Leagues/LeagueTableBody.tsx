import * as React from 'react';
import { LeaguePositions } from '../../Models/Interfaces/LeaguePositions';
import LeagueRow from './LeagueRow';
import { noop } from 'lodash';

interface LeagueTableBodyProps {
	leagues: LeaguePositions[];
	setLeagueBeingViewed: (leagueBeingViewed: string) => void;
}

const LeagueTableBody: React.SFC<LeagueTableBodyProps> = (props) => {
	const { leagues, setLeagueBeingViewed } = props;
	return (
		<table className="my-active-leagues-table">
			<thead>
				<tr
					className="league-header"
					key="header"
				>
					<td className="league-name">League</td>
					<td className="position">Rank</td>
				</tr>
			</thead>
			<tbody className="my-active-leagues">
				{leagues.map((datum, index) => (
					<LeagueRow
						element={datum}
						index={index}
						key={datum.leagueName}
						setLeagueBeingViewed={setLeagueBeingViewed}
					/>
				))}
			</tbody>
		</table>
	);
};

LeagueTableBody.defaultProps = {
	leagues: [],
	setLeagueBeingViewed: noop
};

export default LeagueTableBody;
