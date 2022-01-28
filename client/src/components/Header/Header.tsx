import React from "react";
import Logo from "../Logo/Logo";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "../../types";

const Header: React.FC = () => {
	const userState: UserState = useSelector((state: any) => state.userReducer);
	const navigate = useNavigate();

	const handleHeaderLogoClick = () => {
		if (userState.userType === "ADMIN") {
			navigate("/Admin/Projects");
		} else if (userState.userType === "CUSTOMER") {
			console.log("CUSTOMERRR");
		}
	};

	return (
		<div id='header-container'>
			<div id='header-logo-container' onClick={handleHeaderLogoClick}>
				<Logo id='header-logo' dark={false} scale={1} />
				<h1 id='header-logo-text'>LOGISENSE</h1>
			</div>
		</div>
	);
};

export default Header;
