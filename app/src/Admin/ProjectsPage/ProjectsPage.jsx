import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import { Box, Paper, Grid, styled } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	height: 150,
	backgroundColor: "var(--foreground)",
	borderRadius: 15,
	position: "relative",
	fontFamily: "Medium",
	fontSize: 30,
	lineHeight: 5,
	cursor: "pointer",
	boxShadow: "var(--shadow)",
	transition: "0.5s ease",
	"&:hover": {
		transform: "scale(1.03)",
	},
}));

export default function ProjectsPage() {
	const navigate = useNavigate();
	const [projects, setProjects] = useState([
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
		{ projectName: "Rogers" },
	]);

	const handleProjectClick = (projectName) => {
		navigate(`/Admin/Projects/${projectName}/Dashboard`);
	};

	return (
		<div id='projectsPage' className='pageWithHeader'>
			<Header />

			<Box sx={{ flexGrow: 1 }} style={{ margin: "30px" }}>
				<Grid container spacing={6}>
					{projects.map((project, key) => (
						<Grid
							item
							xs={6}
							md={3}
							key={key}
							onClick={() => handleProjectClick(project.projectName)}>
							<Item>{project.projectName}</Item>
						</Grid>
					))}
				</Grid>
			</Box>
		</div>
	);
}
