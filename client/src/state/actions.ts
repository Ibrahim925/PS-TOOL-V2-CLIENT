import { UserState, UserStateActions } from "../types";

export const USER_LOGIN = (userState: UserState) => {
	return {
		payload: userState,
		type: UserStateActions.LogIn,
	};
};
