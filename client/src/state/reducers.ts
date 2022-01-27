import { combineReducers } from "redux";
import { UserStateActions, UserStatePayload } from "../types";

// User Reducer
const userReducer = (action: UserStatePayload, state = {}) => {
	const { payload } = action;
	const { type } = action;

	switch (type) {
		case UserStateActions.LogIn:
			return {
				userId: payload.id,
				userEmail: payload.userEmail,
				userType: payload.userType,
				userProject: payload.userProject,
			};
		default:
			return state;
	}
};

const reducers = combineReducers({ userReducer });

export default reducers;
