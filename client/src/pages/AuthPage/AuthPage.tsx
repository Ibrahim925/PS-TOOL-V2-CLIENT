import React from "react";
import { useParams, Link } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import "./AuthPage.css";

const LogInPage: React.FC = () => {
	return (
		<div id='auth-page'>
			<div id='auth-page-logo-container'>
				<Logo id='auth-page-logo' scale={4.5} dark />
			</div>

			<div id='auth-page-form-section'>
				<div id='auth-page-form'>
					<h1 id='auth-page-header'>Log In</h1>
					<Input id='auth-page-input' placeholder='Email' />
					<Input id='auth-page-input' placeholder='Password' />
					<Button>Continue</Button>
					<Link to='/Register'>Don't have an account?</Link>
				</div>
			</div>
		</div>
	);
};

const RegisterPage: React.FC = () => {
	return (
		<div id='auth-page'>
			<div id='auth-page-logo-container'>
				<Logo id='auth-page-logo' scale={4.5} dark />
			</div>

			<div id='auth-page-form-section'>
				<div id='auth-page-form'>
					<h1 id='auth-page-header'>Register</h1>
					<Input id='auth-page-input' placeholder='Email' />
					<Button>Continue</Button>
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
