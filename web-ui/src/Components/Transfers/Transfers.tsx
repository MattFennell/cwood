import * as React from 'react';
import '../../Style/Transfers/Transfers.css';
import { getRemainingBudgetAndTransfers } from '../../Services/UserService';
import TransfersForm from '../../Containers/Transfers/TransfersForm';
import TransfersTableBody from './TransfersTableBody';
import { FilteredPlayer } from '../../Models/Interfaces/FilteredPlayer';
import Pitch from '../Team/PitchLayout/Pitch';
import { WeeklyPlayer } from '../../Models/Interfaces/WeeklyPlayer';
import '../../Style/Transfers/PitchValue.css';

interface TransfersProps {
  remainingBudget: number;
  setRemainingBudget: (remainingBudget: number) => void;

  remainingTransfers: number;
  setRemainingTransfers: (remainingTransfers: number) => void;

  filteredPlayers: FilteredPlayer[];
  activeTeam: WeeklyPlayer[];
}

class Transfers extends React.Component<TransfersProps, {}> {
  componentDidMount() {
    // TO:DO Convert this to a DTO server side (not indexing by just 1 and 0)
    getRemainingBudgetAndTransfers().then(remainingBudget => {
      this.props.setRemainingBudget(remainingBudget[0]);
      this.props.setRemainingTransfers(remainingBudget[1]);
    });
  }

  render() {
    return (
      <div className="outer-transfer-columns">
        <div className="left-rows">
          <div className="transfer-info-row">
            <div>Remaining Budget: £{this.props.remainingBudget.toFixed(1)} mil</div>
            <div>Remaining Transfers: {this.props.remainingTransfers}</div>
            <div>Transfer Deadline</div>
          </div>
          <div className="pitch-value">
            <Pitch transfer={true} activeWeeklyTeam={this.props.activeTeam} />
          </div>
        </div>
        <div className="right-rows">
          <div className="flex-container">
            <div>
              <TransfersForm />
            </div>
            <div>
              <div className="transfers-table">
                <TransfersTableBody filteredPlayers={this.props.filteredPlayers} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Transfers;
