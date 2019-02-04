import { ActionTypes, Action as AdminAction } from '../Actions/AdminActions';
import { PlayerDTO } from '../Models/Interfaces/Player';
type Action = AdminAction;

// Define our State interface for the current reducer
export interface State {
  adminPageBeingViewed: string;
  teamAddingPoints: string;
  playersInFilteredTeam: PlayerDTO[];
}

// Define our initialState
export const initialState: State = {
  adminPageBeingViewed: 'home',
  teamAddingPoints: '',
  playersInFilteredTeam: []
};

export const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_ADMIN_PAGE_BEING_VIEWED: {
      return {
        ...state,
        adminPageBeingViewed: action.payload.adminPageBeingViewed
      };
    }

    case ActionTypes.SET_PLAYERS_IN_FILTERED_TEAM: {
      return {
        ...state,
        playersInFilteredTeam: action.payload.players
      };
    }

    case ActionTypes.SET_TEAM_ADDING_POINTS: {
      return {
        ...state,
        teamAddingPoints: action.payload.team
      };
    }

    default:
      return state;
  }
};