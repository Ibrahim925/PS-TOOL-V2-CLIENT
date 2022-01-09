import React from "react";
import Header from "../../Header/Header";
import Dashboard from "./Dashboard";
import ObjectView from "./ObjectView";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";
import "./ProjectPage.css";

export default function ProjectPage({ accountType }) {
	const { projectName, page } = useParams();

	return (
		<div>
			<Header />
			<SideBar
				accountType={accountType}
				projectName={projectName}
				page={page}
			/>
			<div id='projectPage' className='pageWithHeader pageWithSideBar'>
				{page === "Dashboard" ? (
					<Dashboard accountType={accountType} />
				) : (
					<ObjectView accountType={accountType} page={page} />
				)}
			</div>
		</div>
	);
}
