import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

interface LoadingProps {
	isOpen: boolean;
}

const backdropStyles: React.CSSProperties = {
	zIndex: 1000,
	position: "static",
	width: "100%",
	height: "calc(100vh - 100px)",
};

const Loading: React.FC<LoadingProps> = (props) => {
	return (
		<Backdrop open={props.isOpen} invisible={true} style={backdropStyles}>
			<CircularProgress style={{ color: "var(--accent)" }} size={70} />
		</Backdrop>
	);
};

export default Loading;
