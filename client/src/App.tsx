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
import AdminProjectPage from "./pages/admin/AdminProjectPage/AdminProjectPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { request, requestAccessToken } from "./helpers/request";
import { URLS, UserState } from "./types";
import { useDispatch } from "react-redux";
import { USER_LOG_IN } from "./state/actions";
import { Backdrop, CircularProgress } from "@mui/material";
import "./index.css";

const App: React.FC = () => {
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		(async () => {
			// Check if there is a refresh token
			const refreshToken = localStorage.getItem("REFRESH-TOKEN");

			if (!refreshToken) {
				setLoading(false);
				return navigate("/Welcome/LogIn");
			}

			// Check if resource token is valid by creating an access token with it
			const accessToken = await requestAccessToken();

			if (typeof accessToken !== "string") {
				setLoading(false);
				return navigate("/Welcome/LogIn");
			}

			// Request user data
			const userDataResponse: UserState = await request(
				"GET",
				URLS.Resource,
				"/user",
				{}
			);

			// Put in global state
			dispatch(USER_LOG_IN(userDataResponse));

			// If the user is already logged in, make sure the user isn't being put on the auth screen
			const fullPath = location.pathname;
			const rootPath = fullPath.split("/")[1];

			if (rootPath !== "Admin" && rootPath !== "Customer") {
				if (userDataResponse.userType === "ADMIN") {
					navigate("/Admin/Projects");
				} else if (userDataResponse.userType === "CUSTOMER") {
					console.log("CUSTOMERRR");
				}
			}

			setLoading(false);
		})();
	}, []);

	if (loading) {
		return (
			<Backdrop open={loading} invisible={true}>
				<CircularProgress style={{ color: "var(--accent)" }} size={70} />
			</Backdrop>
		);
	}

	return (
		<div>
			<Routes>
				<Route
					path='/Admin/Projects/:projectName'
					element={<AdminProjectPage />}
				/>
				<Route path='/Admin/Projects' element={<ProjectsPage />} />
				<Route path='/Welcome/:page' element={<AuthPage />} />
				<Route path='/' element={<Navigate to='/Welcome/LogIn' />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</div>
	);
};

export default App;
