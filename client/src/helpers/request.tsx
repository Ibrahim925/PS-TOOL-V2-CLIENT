import Axios from "axios";
import { Errors } from "../types";

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
