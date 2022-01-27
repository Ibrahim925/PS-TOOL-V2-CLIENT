import { UserState, UserStateActions } from "../types";

export const USER_LOG_IN = (userState: UserState) => {
	return {
		payload: userState,
		type: UserStateActions.LogIn,
	};
};
