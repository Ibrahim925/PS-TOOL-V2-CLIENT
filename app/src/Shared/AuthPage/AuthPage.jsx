import React, { useState } from "react";
import Input from "../../Form/Input";
import Button from "../../Form/Button";
import LogiLogo from "../../images/LogiLogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import "./AuthPage.css";

function LogInSection({ navigate }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogIn = async () => {
		// Call log in route here
		navigate("/Admin/Projects");
	};

	return (
		<div id='authSection'>
			<div id='authSectionContent'>
				<h2 id='authSectionH2'>Log In</h2>
				<Input type='text' placeholder='Email' update={setEmail} />
				<Input type='password' placeholder='Password' update={setPassword} />
				<Button onClick={handleLogIn}>Continue</Button>
				<Link id='noAccountLink' to='/?page=Register'>
					Don't have an account?
				</Link>
			</div>
		</div>
	);
}

function RegisterSection() {
	const [email, setEmail] = useState("");
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const handleRegister = async () => {
		// Call register route here
	};

	return (
		<div id='authSection'>
			<div id='authSectionContent'>
				<h2 id='authSectionH2'>Register</h2>
				<Input
					type='text'
					placeholder='example@logisense.com'
					update={setEmail}
				/>
				<Button onClick={() => setSnackbarOpen(true)}>Submit</Button>
				<Link id='noAccountLink' to='/'>
					Already have an account?
				</Link>
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={6000}
					onClose={() => setSnackbarOpen(false)}
					message='An email has been sent to you'
				/>
			</div>
		</div>
	);
}

export default function AuthPage() {
	const page = new URLSearchParams(useLocation().search).get("page");
	const navigate = useNavigate();

	return (
		<div id='authPage'>
			<img src={LogiLogo} alt='Logo' id='LogiLogoBig' />
			{page === "Register" ? (
				<RegisterSection navigate={navigate} />
			) : (
				<LogInSection navigate={navigate} />
			)}
		</div>
	);
}
