import React from "react";
import { Button as MUIButton } from "@mui/material";
import "./Form.css";
// TODO HANDLE FORM BUTTON END ICON STYLINGNGNGGTLELKJLJFKSJFIGN
export default function Button(props) {
	const { children, endIcon: EndIcon, ...restProps } = props;

	return (
		<MUIButton
			id='formButton'
			{...restProps}
			endIcon={EndIcon ? <EndIcon /> : null}
			sx={{ textTransform: "none" }}>
			<span id='formButtonChildren'>{children}</span>
		</MUIButton>
	);
}
