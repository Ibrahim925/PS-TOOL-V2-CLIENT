import Axios from "axios";

export const register = async (userEmail: string) => {
	try {
		const { data } = await Axios({
			method: "POST",
			url: "https://ps-tool-v2-auth-service.herokuapp.com/user",
			data: {
				userEmail,
			},
		});

		return data;
	} catch (err) {
		console.log(err);
	}
};

export const logIn = async (userEmail: string, userPassword: string) => {
	try {
		const { data } = await Axios({
			method: "POST",
			url: "https://ps-tool-v2-auth-service.herokuapp.com/user/token",
			data: {
				userEmail,
				userPassword,
			},
		});

		return data;
	} catch (err) {
		console.log(err);
	}
};
