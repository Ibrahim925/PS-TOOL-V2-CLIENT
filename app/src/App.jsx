import React from "react";
import { Route, Routes } from "react-router";
import AuthPage from "./Shared/AuthPage/AuthPage";
import "./index.css";

export default function App() {
	return (
		<Routes>
			<Route exact path='/' element={<AuthPage />} />
			<Route />
		</Routes>
	);
}
