import * as React from 'react';
import '../../Style/Team/Info.css';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

interface StatsProps {
  totalPoints: number;

  weekBeingViewed: number;
  setWeekBeingViewed: (week: number) => void;

  weeklyPointsCache: any;

  totalNumberOfWeeks: number;
}

interface InfoState {
  dropdownOpen: boolean;
}

class Info extends React.Component<StatsProps, InfoState> {
  constructor(props: StatsProps) {
    super(props);
    this._handleWeekChange = this._handleWeekChange.bind(this);
    this._toggle = this._toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  componentDidMount() {}

  _handleWeekChange(week: number) {
    this.props.setWeekBeingViewed(week);
  }

  _toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    let allWeeks: number[] = [];
    for (let x = 0; x <= this.props.totalNumberOfWeeks; x++) {
      allWeeks.push(x);
    }

    const weekOptions = allWeeks.map(week => (
      <p className="menu-items">
        <DropdownItem
          className={'week-menu-item-' + (week === this.props.weekBeingViewed)}
          key={week}
          value={week}
          onClick={() => this._handleWeekChange(week)}
        >
          Week {week}
        </DropdownItem>
      </p>
    ));

    const { totalPoints, weekBeingViewed, weeklyPointsCache } = this.props;
    return (
      <div className="info-columns">
        <div className="total-points">Total Points: {totalPoints}</div>

        <div className="dropdown">
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this._toggle}>
            {'Week: '} {this.props.weekBeingViewed}
            <DropdownToggle caret className="week-menu-toggle">
              {' '}
              {' ▼'}
            </DropdownToggle>
            <DropdownMenu className="week-menu">{weekOptions}</DropdownMenu>
          </Dropdown>
        </div>

        {/* <div className="current-week-dropdown">Week {weekBeingViewed}</div> */}
        <div className="week-points">Week points : {weeklyPointsCache[weekBeingViewed]}</div>
      </div>
    );
  }
}
export default Info;
