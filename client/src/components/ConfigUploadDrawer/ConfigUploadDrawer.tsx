import React, { useState, useEffect } from "react";
import UploadCSVInput from "../UploadCSVInput/UploadCSVInput";
import { Error, Errors, Rules } from "../../types";
import "./ConfigUploadDrawer.css";

// Material UI
import { Drawer } from "@mui/material";
import { request } from "../../helpers/request";
import { URLS } from "../../types";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

interface ConfigUploadDrawerProps {
	isOpen: boolean;
	toggleOpen: (value: boolean) => void;
}

const ConfigUploadDrawer: React.FC<ConfigUploadDrawerProps> = (props) => {
	const [rules, setRules] = useState<any>([]); // TODO: FIGURE OUT HOW TO MAKE TYPE OF RULES WORK HERE
	const [errors, setErrors] = useState<any>([]); // TODO: FIGURE OUT HOW TO MAKE TYPE OF ERRORS WORK HERE
	const [loading, setLoading] = useState(true);
	const [csvName, setCsvName] = useState("");

	const { projectName } = useParams();

	useEffect(() => {
		(async () => {
			setLoading(false);
		})();
	}, []);

	const handleCSVUpload = (e: any) => {
		const file = e.target.files[0];
		// Handles no file uploaded (user clicked cancel)
		if (!file) return;

		setCsvName(file.name);
		setErrors([]);

		// Get csv as text from file
		const reader = new FileReader();
		reader.readAsText(file);

		reader.onload = async (e: any) => {
			setLoading(true);

			const csvText = e.target.result;

			// Save rules
			const uploadCSVRulesResponse: Rules | Errors = await request(
				"POST",
				URLS.Resource,
				"/rule",
				{ projectName, csvText }
			);

			if (!("message" in uploadCSVRulesResponse[0])) {
				setRules(uploadCSVRulesResponse);
			} else {
				setErrors(uploadCSVRulesResponse);
			}

			setLoading(false);
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
			{!loading ? (
				<UploadCSVInput csvName={csvName} handleCSVUpload={handleCSVUpload} />
			) : (
				<Loading isOpen={loading} />
			)}

			{errors.length
				? errors.map((error: Error, key: number) => {
						return (
							<h2 id='config-upload-drawer-error' key={key}>
								{error.message}
							</h2>
						);
				  })
				: null}
		</Drawer>
	);
};

export default ConfigUploadDrawer;
