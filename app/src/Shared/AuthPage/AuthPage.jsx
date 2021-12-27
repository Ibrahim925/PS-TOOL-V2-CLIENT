import React, { useState } from "react";
import Input from "../../Form/Input";
import Button from "../../Form/Button";
import LogiLogo from "../../images/LogiLogo.png";
import { Link, useLocation } from "react-router-dom";
import "./AuthPage.css";

function LogInSection() {
	return (
		<div id='authSection'>
			<div id='authSectionContent'>
				<h2 id='authSectionH2'>Log In</h2>
				<Input type='text' placeholder='Email' />
				<Input type='password' placeholder='Password' />
				<Button>Continue</Button>
				<Link id='noAccountLink' to='/?page=Register'>
					Don't have an account?
				</Link>
			</div>
		</div>
	);
}

function RegisterSection() {
	return (
		<div id='authSection'>
			<div id='authSectionContent'>
				<h2 id='authSectionH2'>Register</h2>
				<Input type='text' placeholder='example@logisense.com' />
				<Button>Continue</Button>
				<Link id='noAccountLink' to='/'>
					Already have an account?
				</Link>
			</div>
		</div>
	);
}

export default function AuthPage() {
	const page = new URLSearchParams(useLocation().search).get("page");

	return (
		<div id='authPage'>
			<img src={LogiLogo} alt='Logo' id='LogiLogoBig' />
			{page === "Register" ? <RegisterSection /> : <LogInSection />}
		</div>
	);
}
