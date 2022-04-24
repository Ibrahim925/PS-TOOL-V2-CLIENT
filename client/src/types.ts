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
	Auth = "http://ps-tool-v2-auth-env.eba-8ph7uvde.ca-central-1.elasticbeanstalk.com",
	Resource = "http://ps-tool-v2-resource-env.eba-h2dakg4s.ca-central-1.elasticbeanstalk.com",
	Validation = "http://ps-tool-v2-validation-web-env.eba-pxidjpjm.ca-central-1.elasticbeanstalk.com",
}

// User reducer actions
export enum UserStateActions {
	LogIn = "LOG IN",
	LogOut = "LOG OUT",
}

export interface IUser {
	id: number;
	userEmail: string;
	userProject: string | null;
	userType: "ADMIN" | "CUSTOMER";
}

export interface UserStatePayload {
	payload: IUser;
	type: UserStateActions;
}

// Project versions
export enum Versions {
	V9 = "V9",
	V10 = "V10",
}

// Project
export interface IProject {
	id: number;
	projectName: string;
	projectVersion: Versions;
}

// Notification
export interface INotification {
	id: number;
	notificationDate: string;
	notificationTime: string;
	notificationText: string;
	notificationProject: string;
	notificationObject: string;
}

// Rules
export enum Config {
	Base = "Base",
	Business = "Business",
	Customer = "Customer",
}

export enum DataTypes {
	String = "STRING",
	Integer = "INTEGER",
	Boolean = "BOOLEAN",
	Char = "CHAR",
	DateTime = "DATETIME",
	Text = "TEXT",
}

export enum Cases {
	Upper = "UPPER",
	Lower = "LOWER",
	Camel = "CAMEL",
	Snake = "SNAKE",
	Any = "ANY",
}

export interface Rule {
	configuration: Config;
	object: string;
	field: string;
	dataType: DataTypes;
	case: Cases;
	required: boolean;
	dependency: string;
	[rule: string]: any;
}

export interface LogiObject {
	objectName: string;
	objectConfig: Config;
}

export type Rules = Rule[];
