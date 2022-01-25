import React from "react";
import Logo from "../../components/Logo/Logo";
import "./AuthPage.css";

const AuthPage: React.FC = () => {
	return (
		<div id='auth-page'>
			<div id='auth-page-logo-container'>
				<Logo id='auth-page-logo' scale={4.5} dark />
			</div>

			<div id='auth-page-form-section'>
				<div id='auth-page-form'>
					<h1 id='auth-page-header'>Log In</h1>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
