import { combineReducers } from "redux";
import { UserStateActions, UserStatePayload } from "../types";

// User Reducer
const userReducer = (state = {}, action: UserStatePayload) => {
	switch (action.type) {
		case UserStateActions.LogIn:
			return {
				userId: action.payload.id,
				userEmail: action.payload.userEmail,
				userType: action.payload.userType,
				userProject: action.payload.userProject,
			};
		default:
			return state;
	}
};

const reducers = combineReducers({ userReducer });

export default reducers;
