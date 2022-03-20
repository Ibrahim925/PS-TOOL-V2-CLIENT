import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { IUser, LogiObject, Rules, URLS } from "../../types";
import { request } from "../../helpers/request";
import { useParams } from "react-router-dom";
import DataTable from "../DataTable/DataTable";
import { useSelector } from "react-redux";
import UploadCSVInput from "../UploadCSVInput/UploadCSVInput";
import downloadFile from "../../helpers/downloadFile";
import "./ObjectView.css";
import { Box, LinearProgress, Typography } from "@mui/material";

const LIMIT = 1000000000;

const LinearProgressWithLabel = (props: any) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "100%", mr: 1 }}>
				<LinearProgress variant='determinate' {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant='body2' color='text.secondary'>{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
		</Box>
	);
};

interface ObjectViewProps {
	objects: LogiObject[];
	object: LogiObject;
}

const ObjectView: React.FC<ObjectViewProps> = (props) => {
	const { projectName } = useParams();
	const userState: IUser = useSelector((state: any) => state.userReducer);

	const [rules, setRules] = useState<Rules>([]);
	const [loading, setLoading] = useState(true);
	const [errorCount, setErrorCount] = useState(0);
	const [csvName, setCsvName] = useState("");
	const [outputCsvPath, setOutputCsvPath] = useState("");
	const [incorrectFields, setIncorrectFields] = useState(false);
	const [success, setSuccess] = useState(false);
	const [jobProgress, setJobProgress] = useState(0);
	const [jobLoading, setJobLoading] = useState(false);

	useEffect(() => {
		(async () => {
			setErrorCount(0);
			setCsvName("");
			setSuccess(false);
			setOutputCsvPath("");
			setIncorrectFields(false);
			setLoading(true);
			setJobProgress(0);

			// Get rules for object
			const getObjectRulesResponse = await request(
				"GET",
				URLS.Resource,
				`/rule/object/${projectName}/${props.object.objectName}`,
				{}
			);

			setRules(getObjectRulesResponse);
			setLoading(false);
		})();
	}, [props.object.objectName]);

	const checkJobStatus = async (jobId: number) => {
		const checkJob = setInterval(async () => {
			const uploadCSVResponse = await request(
				"GET",
				URLS.Validation,
				`/validate/${jobId}`,
				{}
			);

			console.log(uploadCSVResponse);

			if ("jobProgress" in uploadCSVResponse) {
				setJobProgress(uploadCSVResponse.jobProgress);
			} else {
				if (uploadCSVResponse.missingDependencies) {
					alert(
						`The object is missing the following dependencies: ${uploadCSVResponse.missingDependencies.join(
							","
						)}`
					);
				} else if (uploadCSVResponse.incorrectFields) {
					setIncorrectFields(true);
				} else if (uploadCSVResponse.errorCount) {
					setErrorCount(uploadCSVResponse.errorCount);
					setOutputCsvPath(uploadCSVResponse.payload.path);
					downloadFile(
						uploadCSVResponse.payload.csvText,
						uploadCSVResponse.payload.path
					);
				} else if (uploadCSVResponse.success) {
					setSuccess(true);
					setOutputCsvPath(uploadCSVResponse.payload.path);
					downloadFile(
						uploadCSVResponse.payload.csvText,
						uploadCSVResponse.payload.path
					);
				}

				setJobLoading(false);
				clearInterval(checkJob);
			}
		}, 3000);
	};

	const handleCSVUpload = async (e: any) => {
		const file = e.target.files[0];
		// Handles no file uploaded (user clicked cancel)
		if (!file) return;

		setCsvName(file.name);
		setErrorCount(0);
		setIncorrectFields(false);
		setSuccess(false);

		// Get csv as text from file
		const reader = new FileReader();
		reader.readAsText(file);

		reader.onload = async (e: any) => {
			setJobLoading(true);

			const csvText = e.target.result;

			const jobId = await request("POST", URLS.Validation, "/validate", {
				projectName,
				objectName: props.object.objectName,
				csvText,
			});

			console.log(jobId);

			alert(
				"Object data uploaded for validation. Please do not refresh or navigate away from this page."
			);

			checkJobStatus(jobId);
		};
	};

	const uploadCSVInput =
		userState.userType === "CUSTOMER" ? (
			<UploadCSVInput handleCSVUpload={handleCSVUpload} csvName={csvName} />
		) : null;

	if (jobLoading) {
		return (
			<Box
				sx={{ width: "70%" }}
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translateX(-50%) translateY(-50%)",
				}}>
				<LinearProgressWithLabel
					variant='determinate'
					value={jobProgress}
					color='secondary'
				/>
				<Typography
					style={{
						position: "absolute",
						left: "50%",
						transform: "translateX(-50%)",
						color: "grey",
					}}>
					Might want to get a snack...
				</Typography>
			</Box>
		);
	}

	if (loading) {
		return <Loading isOpen={loading} />;
	}

	if (errorCount) {
		return (
			<div>
				{uploadCSVInput}

				<h2 id='object-view-message'>
					The file had {errorCount > LIMIT ? "1000000000+" : errorCount} error
					{errorCount > 1 ? "s" : ""}.<br />
					<span id='object-view-message-more'>
						You can view these errors in the downloaded CSV file:{" "}
						<span
							style={{ color: "black", fontFamily: "bold", opacity: "100%" }}>
							{outputCsvPath}
						</span>
					</span>
				</h2>
			</div>
		);
	}

	if (incorrectFields) {
		return (
			<div>
				{uploadCSVInput}

				<h2 id='object-view-message'>
					Please upload a CSV with the correct fields.
				</h2>
			</div>
		);
	}

	if (success) {
		return (
			<div>
				{uploadCSVInput}

				<h2 id='object-view-message'>
					We've detected zero errors in the file. <br />
					<span id='object-view-message-more'>
						Here is the final export CSV:{" "}
						<span
							style={{ color: "black", fontFamily: "bold", opacity: "100%" }}>
							{outputCsvPath}
						</span>
					</span>
				</h2>
			</div>
		);
	}

	return (
		<div id='object-view-container'>
			{uploadCSVInput}

			<DataTable object={props.object} rules={rules} />
		</div>
	);
};

export default ObjectView;
