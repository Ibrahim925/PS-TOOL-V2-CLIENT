import React from "react";
import { Dialog } from "@mui/material";

const popupMenuStyles: React.CSSProperties = {
	backgroundColor: "var(--base)",
	height: 800,
	width: 800,
	color: "white",
};

interface PopupMenuProps {
	open: boolean;
	header: string;
	style?: React.CSSProperties;
	onClose: () => void;
}

const PopupMenu: React.FC<PopupMenuProps> = (props) => {
	return (
		<Dialog
			open={props.open}
			onClose={props.onClose}
			PaperProps={{
				style: props.style
					? { ...popupMenuStyles, ...props.style }
					: popupMenuStyles,
			}}>
			<h1 className='form-popup-menu-header'>{props.header}</h1>
			{props.children}
		</Dialog>
	);
};

export default PopupMenu;
