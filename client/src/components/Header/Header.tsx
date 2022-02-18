import React, { useState } from "react";
import Logo from "../Logo/Logo";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../types";
import { ExitToApp, Menu, Settings } from "@mui/icons-material";
import {
	Menu as MenuC,
	MenuItem,
	IconButton,
	Paper,
	ListItemText,
	ListItemIcon,
	Divider,
} from "@mui/material";

interface HeaderProps {
	Middle?: JSX.Element;
	Right?: JSX.Element;
}

const Header: React.FC<HeaderProps> = (props) => {
	const userState: IUser = useSelector((state: any) => state.userReducer);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [menuAnchor, setMenuAnchor] = useState(null);

	const handleHeaderLogoClick = () => {
		if (userState.userType === "ADMIN") {
			navigate("/Admin/Projects");
		} else if (userState.userType === "CUSTOMER") {
			navigate(`/Customer/Projects/${userState.userProject}/Dashboard`);
		}
	};

	const handleLogOut = () => {
		dispatch({ type: "USER_LOG_OUT" });

		localStorage.removeItem("REFRESH-TOKEN");

		window.location.replace("/Welcome/LogIn");
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
				<IconButton
					id='header-menu-button'
					onClick={(e: any) => setMenuAnchor(e.currentTarget)}>
					<Menu fontSize='large' />
				</IconButton>

				<Paper sx={{ width: 320, maxWidth: "100%" }}>
					<MenuC
						open={Boolean(menuAnchor)}
						anchorEl={menuAnchor}
						onClose={() => setMenuAnchor(null)}>
						<MenuItem onClick={() => navigate("/Settings/Password")}>
							<ListItemIcon>
								<Settings fontSize='small' />
							</ListItemIcon>
							<ListItemText>Settings</ListItemText>
						</MenuItem>
						<Divider />
						<MenuItem onClick={handleLogOut}>
							<ListItemIcon>
								<ExitToApp fontSize='small' />
							</ListItemIcon>
							<ListItemText>Log out</ListItemText>
						</MenuItem>
					</MenuC>
				</Paper>
			</div>
		</div>
	);
};

export default Header;
