import React from "react";
import Logo from "../Logo/Logo";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "../../types";

interface HeaderProps {
	Middle?: any;
	Right?: any;
}

const Header: React.FC<HeaderProps> = (props) => {
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
			<div id='header-content'>
				<div id='header-logo-container' onClick={handleHeaderLogoClick}>
					<Logo id='header-logo' dark={false} scale={1} />
					<h1 id='header-logo-text'>LOGISENSE</h1>
				</div>
				{props.Middle && (
					<div id='header-middle'>{props.Middle && props.Middle}</div>
				)}
				{props.Right && (
					<div id='header-right'>{props.Right && props.Right}</div>
				)}
			</div>
		</div>
	);
};

export default Header;
