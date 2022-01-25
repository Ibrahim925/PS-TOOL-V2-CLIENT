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
