import React, { useState, useEffect } from "react";
import UploadCSVInput from "../UploadCSVInput/UploadCSVInput";
import "./ConfigUploadDrawer.css";

// Material UI
import { Drawer } from "@mui/material";
import { request } from "../../helpers/request";
import { URLS } from "../../types";
import { useParams } from "react-router-dom";

interface ConfigUploadDrawerProps {
	isOpen: boolean;
	toggleOpen: (value: boolean) => void;
}

const ConfigUploadDrawer: React.FC<ConfigUploadDrawerProps> = (props) => {
	const [csvName, setCsvName] = useState("");

	const { projectName } = useParams();

	const handleCSVUpload = (e: any) => {
		const file = e.target.files[0];
		// Handles no file uploaded (user clicked cancel)
		if (!file) return;

		setCsvName(file.name);

		// Get csv as text from file
		const reader = new FileReader();
		reader.readAsText(file);

		reader.onload = async (e: any) => {
			const csvText = e.target.result;
			const uploadCSVRulesResponse = await request(
				"POST",
				URLS.Resource,
				"/rule",
				{ projectName, csvText }
			);

			console.log(uploadCSVRulesResponse);
		};
	};

	return (
		<Drawer
			open={props.isOpen}
			onClose={() => props.toggleOpen(false)}
			PaperProps={{
				style: {
					width: "85vw",
					backgroundColor: "whitesmoke",
					borderRight: "10px solid #c4c4c4",
					padding: 10,
				},
			}}
			anchor='left'>
			<UploadCSVInput csvName={csvName} handleCSVUpload={handleCSVUpload} />
		</Drawer>
	);
};

export default ConfigUploadDrawer;
