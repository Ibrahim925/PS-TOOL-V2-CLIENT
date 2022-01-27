import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import "./index.css";
import ProjectsPage from "./pages/admin/ProjectsPage/ProjectsPage";

const App: React.FC = () => {
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
