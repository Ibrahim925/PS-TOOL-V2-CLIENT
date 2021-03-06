import React, { useEffect, useState } from "react";
import {
	Accordion,
	AccordionSummary as MuiAccordionSummary,
	AccordionDetails,
	Typography,
	styled,
} from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import "./Sidebar.css";
import { request } from "../../helpers/request";
import { IUser, LogiObject, URLS } from "../../types";
import { useSelector } from "react-redux";

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIos sx={{ fontSize: "0.9rem" }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor:
		theme.palette.mode === "dark"
			? "rgba(255, 255, 255, .05)"
			: "rgba(0, 0, 0, .03)",
	flexDirection: "row-reverse",
	"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
		transform: "rotate(90deg)",
	},
}));

interface SidebarProps {
	objects: LogiObject[];
}

const Sidebar: React.FC<SidebarProps> = (props) => {
	const { projectName, page } = useParams();

	const userState: IUser = useSelector((state: any) => state.userReducer);

	const navigate = useNavigate();
	const basePath = `/${
		userState.userType === "ADMIN" ? "Admin" : "Customer"
	}/Projects/${projectName}`;

	const handleDashboardClick = () => {
		navigate(`${basePath}/Dashboard`);
	};

	const handleObjectClick = (objectName: string) => {
		navigate(`${basePath}/${objectName}`);
	};

	return (
		<div id='sidebar-container'>
			<h2 id='sidebar-project-name-header' onClick={handleDashboardClick}>
				{projectName}
			</h2>

			{[
				"Base Configuration",
				"Business Configuration",
				"Customer Configuration",
			].map((config) => (
				<Accordion id='sidebar-accordion' key={config}>
					<AccordionSummary>
						<Typography id='sidebar-accordion-summary-text'>
							{config}
						</Typography>
					</AccordionSummary>
					{props.objects.map((object) =>
						object.objectConfig + " Configuration" === config ? (
							<AccordionDetails
								id='sidebar-accordion-details'
								key={object.objectName}
								onClick={() => handleObjectClick(object.objectName)}
								style={
									page === object.objectName
										? { backgroundColor: "var(--foreground-content)" }
										: {}
								}>
								{object.objectName}
							</AccordionDetails>
						) : null
					)}
				</Accordion>
			))}
		</div>
	);
};

export default Sidebar;
