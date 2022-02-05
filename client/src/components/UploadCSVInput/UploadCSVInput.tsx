import React from "react";
import UploadImage from "../../assets/images/UploadImage.png";
import "./UploadCSVInput.css";

interface UploadCSVInputProps {
	csvName?: string;
	handleCSVUpload: (e: React.ChangeEvent) => void;
}

const UploadCSVInput: React.FC<UploadCSVInputProps> = (props) => {
	return (
		<div>
			<label id='csv-file-input-container'>
				<img id='upload-image' src={UploadImage} alt='Upload' />
				<input
					type='file'
					style={{ display: "none" }}
					onChange={(e) => props.handleCSVUpload(e)}
					accept='.csv,.CSV'
				/>
				<p id='upload-csv-label'>
					{props.csvName ? props.csvName : "Upload a CSV"}
				</p>
			</label>
		</div>
	);
};

export default UploadCSVInput;
