import React, { useState } from "react";
import {
	Accordion,
	AccordionSummary as MuiAccordionSummary,
	AccordionDetails,
	Typography,
	styled,
} from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

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
	projectName: string;
	page: string;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
	const navigate = useNavigate();
	const basePath = `/Admin/Projects/${props.projectName}`;

	const [objects, setObjects] = useState([
		{ objectName: "Base", objectConfig: "Base Configuration" },
		{ objectName: "BOB", objectConfig: "Base Configuration" },
	]);

	const handleDashboardClick = () => {
		navigate(`${basePath}/Dashboard`);
	};

	const handleObjectClick = (objectName: string) => {
		navigate(`${basePath}/${objectName}`);
	};

	return (
		<div id='sidebar-container'>
			<h2 id='sidebar-project-name-header' onClick={handleDashboardClick}>
				{props.projectName}
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
					{objects.map((object) =>
						object.objectConfig === config ? (
							<AccordionDetails
								id='sidebar-accordion-details'
								key={object.objectName}
								onClick={() => handleObjectClick(object.objectName)}
								style={
									props.page === object.objectName
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
