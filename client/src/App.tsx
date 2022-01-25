import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage";
import "./index.css";

const App: React.FC = () => {
	return (
		<div>
			<Routes>
				<Route path='/' element={<AuthPage />} />
			</Routes>
		</div>
	);
};

export default App;
