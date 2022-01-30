import React from "react";
import Header from "../../../components/Header/Header";
import Dashboard from "../../../components/Dashboard/Dashboard";
// import ObjectView from "./ObjectView";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import "./AdminProjectPage.css";

export default function ProjectPage() {
	const { projectName, page } = useParams();

	return (
		<div>
			<Header />
			<Sidebar projectName={projectName as string} page={page as string} />
			<div id='projectPage' className='page-with-header page-with-sidebar'>
				{page === "Dashboard" ? (
					<Dashboard />
				) : (
					// <ObjectView accountType={accountType} page={page} />
					"OBJECT: " + page
				)}
			</div>
		</div>
	);
}
