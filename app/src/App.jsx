import React from "react";
import { Route, Routes } from "react-router";
import AuthPage from "./Shared/AuthPage/AuthPage";
import ProjectsPage from "./Admin/ProjectsPage/ProjectsPage";
import ProjectPage from "./Shared/ProjectPage/ProjectPage";
import accountTypeConstants from "./Shared/accountTypeConstants";
import NotFoundPage from "./Shared/NotFoundPage/NotFoundPage";
import "./index.css";

export default function App() {
	return (
		<Routes>
			<Route exact path='/' element={<AuthPage />} />
			<Route path='/Admin/Projects' element={<ProjectsPage />} />
			<Route
				path='/Admin/Projects/:projectName/:page'
				element={<ProjectPage accountType={accountTypeConstants.admin} />}
			/>
			<Route
				path='/Customer/Projects/:projectName/:page'
				element={<ProjectPage accountType={accountTypeConstants.customer} />}
			/>
			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	);
}
