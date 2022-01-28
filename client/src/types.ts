// Errors sent to user
export interface Error {
	message: string;
	location?: string;
}

export type Errors = Error[];

// Success type
export enum SuccessMessage {
	Success = "SUCCESS",
}

// Service URLS
export enum URLS {
	Auth = "https://ps-tool-v2-auth-service.herokuapp.com",
	Resource = "https://ps-tool-v2-resource-service.herokuapp.com",
}

// User reducer actions
export enum UserStateActions {
	LogIn = "LOG IN",
	LogOut = "LOG OUT",
}

export interface UserState {
	id: number;
	userEmail: string;
	userProject: string | null;
	userType: "ADMIN" | "CUSTOMER";
}

export interface UserStatePayload {
	payload: UserState;
	type: UserStateActions;
}
