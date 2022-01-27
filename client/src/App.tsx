import React, { useState, useEffect } from "react";
import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProjectsPage from "./pages/admin/ProjectsPage/ProjectsPage";
import { request, requestAccessToken } from "./helpers/request";
import { URLS, UserState } from "./types";
import { useDispatch } from "react-redux";
import { USER_LOG_IN } from "./state/actions";
import { Backdrop, CircularProgress } from "@mui/material";
import "./index.css";

const App: React.FC = () => {
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		(async () => {
			setLoading(true);
			// Check if there is a refresh token
			const refreshToken = localStorage.getItem("REFRESH-TOKEN");

			if (!refreshToken) {
				setLoading(false);
				return navigate("/LogIn");
			}
			const accessToken = await requestAccessToken();

			if (typeof accessToken !== "string") {
				setLoading(false);
				return navigate("/LogIn");
			}

			const userDataResponse: UserState = await request(
				"GET",
				URLS.Resource,
				"/user",
				{}
			);

			dispatch(USER_LOG_IN(userDataResponse));

			const fullPath = location.pathname;
			const rootPath = fullPath.split("/")[1];

			if (rootPath !== "Admin" && rootPath !== "Customer") {
				if (userDataResponse.userType === "ADMIN") {
					navigate("/Admin/ProjectsPage");
				} else if (userDataResponse.userType === "CUSTOMER") {
					console.log("CUSTOMERRR");
				}
			}

			setLoading(false);
		})();
	}, []);

	if (loading) {
		return (
			<Backdrop open={loading}>
				<CircularProgress style={{ color: "var(--accent)" }} />
			</Backdrop>
		);
	}

	return (
		<div>
			<Routes>
				<Route path='/Admin/ProjectsPage' element={<ProjectsPage />} />
				<Route path='/:page' element={<AuthPage />} />
				<Route path='/' element={<Navigate to='/LogIn' />} />
			</Routes>
		</div>
	);
};

export default App;
