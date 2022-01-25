import React, { useState } from "react";
import { Errors } from "../../types";
import { useParams, Link } from "react-router-dom";
import { register, logIn } from "../../helpers/request";
import { SuccessMessage } from "../../types";
import { CircularProgress, Snackbar } from "@mui/material";
import Logo from "../../components/Logo/Logo";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import "./AuthPage.css";

const LogInPage: React.FC = () => {
	const [userEmail, setUserEmail] = useState("");
	const [userPassword, setUserPassword] = useState("");
	const [errors, setErrors] = useState<Errors | null>();
	const [loading, setLoading] = useState(false);

	const handleUserLogIn = async () => {
		setLoading(true);
		const response = await logIn(userEmail, userPassword);
		if (Array.isArray(response)) {
			setErrors(response);
		}
		setLoading(false);
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
						location='emailInput'
						errors={errors}
					/>
					<Input
						id='auth-page-input'
						placeholder='Password'
						update={setUserEmail}
						location='passwordInput'
						errors={errors}
					/>
					<Button id='auth-page-button' onClick={handleUserLogIn}>
						Continue
					</Button>
					<Link to='/Register'>Don't have an account?</Link>
					{loading && (
						<CircularProgress
							style={{ color: "white", marginTop: 40 }}
							size={30}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

const RegisterPage: React.FC = () => {
	const [userEmail, setUserEmail] = useState("");
	const [errors, setErrors] = useState<Errors | null>();
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleUserRegister = async () => {
		setSuccess(false);
		setErrors(null);
		setLoading(true);

		const response = await register(userEmail);

		// Check if response is an array of errors
		if (Array.isArray(response)) {
			setErrors(response);
		} else if (SuccessMessage.Success) {
			setSuccess(true);
		}

		setLoading(false);
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
						errors={errors}
						location='emailInput'
					/>
					<Button
						id='auth-page-button'
						onClick={handleUserRegister}
						disabled={loading}>
						Continue
					</Button>
					<Link to='/LogIn'>Already have an account?</Link>
					{loading && (
						<CircularProgress
							style={{ color: "white", marginTop: 40 }}
							size={30}
						/>
					)}
				</div>
			</div>
			<Snackbar
				open={success}
				autoHideDuration={10000}
				onClose={() => setSuccess(false)}
				message={`An email has been sent to ${userEmail}`}
			/>
		</div>
	);
};

const AuthPage: React.FC = () => {
	const { page } = useParams();

	return page === "LogIn" ? <LogInPage /> : <RegisterPage />;
};

export default AuthPage;
