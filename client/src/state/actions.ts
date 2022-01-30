import { IUser, UserStateActions } from "../types";

export const USER_LOG_IN = (userState: IUser) => {
	return {
		payload: userState,
		type: UserStateActions.LogIn,
	};
};
