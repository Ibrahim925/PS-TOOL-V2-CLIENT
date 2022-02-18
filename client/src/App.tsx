import React, { useState, useEffect } from "react";
import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
} from "react-router-dom";
import Loading from "./components/Loading/Loading";
import AuthPage from "./pages/AuthPage/AuthPage";
import ProjectsPage from "./pages/admin/ProjectsPage/ProjectsPage";
import AdminProjectPage from "./pages/admin/AdminProjectPage/AdminProjectPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { request, requestAccessToken } from "./helpers/request";
import { URLS, IUser } from "./types";
import { useDispatch } from "react-redux";
import { USER_LOG_IN } from "./state/actions";
import "./index.css";
import CustomerProjectPage from "./pages/customer/CustomerProjectPage/CustomerProjectPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";

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

			if (!accessToken) {
				localStorage.removeItem("REFRESH-TOKEN");
				setLoading(false);
				return navigate("/Welcome/LogIn");
			}

			// Request user data
			const userDataResponse: IUser = await request(
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

			if (rootPath === "Settings") {
			} else if (
				userDataResponse.userType === "ADMIN" &&
				rootPath !== "Admin"
			) {
				navigate("/Admin/Projects");
			} else if (
				userDataResponse.userType === "CUSTOMER" &&
				rootPath !== "Customer"
			) {
				navigate(
					`/Customer/Projects/${userDataResponse.userProject}/Dashboard`
				);
			}

			setLoading(false);
		})();
	}, []);

	if (loading) {
		return <Loading isOpen={loading} />;
	}

	return (
		<div>
			<Routes>
				<Route path='/Settings/:settingsPage' element={<SettingsPage />} />
				<Route
					path='/Admin/Projects/:projectName/:page'
					element={<AdminProjectPage />}
				/>
				<Route
					path='/Customer/Projects/:projectName/:page'
					element={<CustomerProjectPage />}
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
