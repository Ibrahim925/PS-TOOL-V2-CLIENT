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
}
