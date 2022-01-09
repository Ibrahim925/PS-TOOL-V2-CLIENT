import React from "react";
import Button from "../Form/Button";
import { useLocation } from "react-router-dom";
import LogiLogoSmall from "../images/LogiLogoSmall.png";
import { Add, Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import "./Header.css";

export default function Header() {
	// Get deepest pathname / thing
	const [page] = useLocation().pathname.split("/").slice(-1);

	return (
		<div id='headerContainer'>
			<img id='headerLogo' src={LogiLogoSmall} alt='Logo' />

			{page === "Projects" ? (
				<Button id='headerButton' endIcon={Add}>
					Project
				</Button>
			) : null}

			<IconButton id='headerMenuToggle'>
				<Menu fontSize='large' />
			</IconButton>
		</div>
	);
}
