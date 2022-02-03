import Axios, { Method } from "axios";
import { URLS } from "../types";

export const register = async (userEmail: string) => {
	try {
		const { data } = await Axios({
			method: "POST",
			url: `${URLS.Auth}/user`,
			data: {
				userEmail,
			},
		});

		return data;
	} catch (err) {
		console.error(err);
	}
};

export const logIn = async (userEmail: string, userPassword: string) => {
	try {
		const { data } = await Axios({
			method: "POST",
			url: `${URLS.Auth}/user/token`,
			data: {
				userEmail,
				userPassword,
			},
		});

		return data;
	} catch (err) {
		console.error(err);
	}
};

export const requestAccessToken = async () => {
	// Generate access token for request
	try {
		const refreshToken = localStorage.getItem("REFRESH-TOKEN");

		if (!refreshToken) {
			console.error("No refresh token found!");
		}

		const { data: accessTokenResponse } = await Axios({
			method: "POST",
			url: `${URLS.Auth}/token`,
			headers: {
				Authorization: `Bearer ${refreshToken}`,
			},
		});

		return accessTokenResponse.accessToken;
	} catch (err) {
		alert("Session timed out");
		window.location.replace("/Welcome/LogIn");
		localStorage.removeItem("REFRESH-TOKEN");
	}
};

export const request = async (
	method: Method,
	url: URLS,
	path: string,
	data: any
) => {
	try {
		const accessToken = await requestAccessToken();

		// Make requested request
		const { data: response } = await Axios({
			method,
			url: `${url}${path}`,
			data,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return response;
	} catch (err) {
		alert("Session timed out");
		window.location.replace("/Welcome/LogIn");
		localStorage.removeItem("REFRESH-TOKEN");
	}
};
