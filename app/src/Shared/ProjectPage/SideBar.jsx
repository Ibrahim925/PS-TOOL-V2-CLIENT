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
import "./ProjectPage.css";

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

export default function SideBar({ accountType, projectName, page }) {
	const navigate = useNavigate();
	const basePath = `/${accountType}/Projects/${projectName}`;

	const [objects, setObjects] = useState([
		{ objectName: "Base", objectConfig: "Base Configuration" },
		{ objectName: "BOB", objectConfig: "Base Configuration" },
	]);

	const handleDashboardClick = () => {
		navigate(`${basePath}/Dashboard`);
	};

	const handleObjectClick = (objectName) => {
		navigate(`${basePath}/${objectName}`);
	};

	return (
		<div id='sideBarContainer'>
			<h2 id='sideBarProjectNameHeader' onClick={handleDashboardClick}>
				{projectName}
			</h2>

			{[
				"Base Configuration",
				"Business Configuration",
				"Customer Configuration",
			].map((config) => (
				<Accordion id='sideBarAccordion' key={config}>
					<AccordionSummary>
						<Typography id='sideBarAccordionSummaryText'>{config}</Typography>
					</AccordionSummary>
					{objects.map((object) =>
						object.objectConfig === config ? (
							<AccordionDetails
								id='sideBarAccordionDetails'
								key={object.objectName}
								onClick={() => handleObjectClick(object.objectName)}
								style={
									page === object.objectName
										? { backgroundColor: "var(--foreground-content)" }
										: null
								}>
								{object.objectName}
							</AccordionDetails>
						) : null
					)}
				</Accordion>
			))}
		</div>
	);
}
