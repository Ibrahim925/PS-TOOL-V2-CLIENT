// Errors sent to user
export interface Error {
	message: string;
	location?: string;
}

export interface Errors {
	errors: Error[];
}
