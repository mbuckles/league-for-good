import {FETCH_LEAGUES, CREATE_LEAGUE, SELECT_LEAGUE, REMOVE_LEAGUE } from '../actions/types';
 
/*
	League State

	list -     (Array) - List of all leagues objects associated w user
	selected - (Object)- The league being displayed

*/

const removeReg = ({ selected: { pendingPlayers, ...rest }}, _id) => {
	const updatedArr = pendingPlayers.filter(p => p._id !== _id);	
	return { ...rest, pending_players: updatedArr };
};



const defaultState = { list: [], selected: {} };

export default function(state = defaultState, action) {

	switch (action.type) {

	case REMOVE_LEAGUE: 
		return { 
			selected: {},
			list: state.list.filter(league => league._id !== action.leagueId),
		};

	case CREATE_LEAGUE:
		return {...state, list: [...state.list, action.newLeague]};

	case FETCH_LEAGUES:
		return {...state, list: action.leagueInfo };

	case SELECT_LEAGUE:
		return {
			...state,
			selected: state.list.find(league => league._id === action.leagueId),
		};

	case 'REMOVE_REGISTRATION':
		return { ...state, selected: removeReg(state, action.payload) };

	default:
		return state;
	}
}
