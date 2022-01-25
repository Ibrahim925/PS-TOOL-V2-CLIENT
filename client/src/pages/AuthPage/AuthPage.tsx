import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { register } from "../../helpers/request";
import Logo from "../../components/Logo/Logo";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import "./AuthPage.css";

const LogInPage: React.FC = () => {
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const handleUserLogIn = () => {
		console.log("blah");
	};

	return (
		<div id='auth-page'>
			<div id='auth-page-logo-container'>
				<Logo id='auth-page-logo' scale={4.5} dark />
			</div>

			<div id='auth-page-form-section'>
				<div id='auth-page-form'>
					<h1 id='auth-page-header'>Log In</h1>
					<Input
						id='auth-page-input'
						placeholder='Email'
						update={setUserEmail}
					/>
					<Input
						id='auth-page-input'
						placeholder='Password'
						update={setUserEmail}
					/>
					<Button id='auth-page-button' onClick={handleUserLogIn}>
						Continue
					</Button>
					<Link to='/Register'>Don't have an account?</Link>
				</div>
			</div>
		</div>
	);
};

const RegisterPage: React.FC = () => {
	const [userEmail, setUserEmail] = useState("");

	const handleUserRegister = async () => {
		const response = await register(userEmail);
		// TODO: HANDLE RESPONSE

		console.log(response);
	};

	return (
		<div id='auth-page'>
			<div id='auth-page-logo-container'>
				<Logo id='auth-page-logo' scale={4.5} dark />
			</div>

			<div id='auth-page-form-section'>
				<div id='auth-page-form'>
					<h1 id='auth-page-header'>Register</h1>
					<Input
						id='auth-page-input'
						placeholder='Email'
						update={setUserEmail}
					/>
					<Button id='auth-page-button' onClick={handleUserRegister}>
						Continue
					</Button>
					<Link to='/LogIn'>Already have an account?</Link>
				</div>
			</div>
		</div>
	);
};

const AuthPage: React.FC = () => {
	const { page } = useParams();

	return page === "LogIn" ? <LogInPage /> : <RegisterPage />;
};

export default AuthPage;
