import React from "react";
import "./Form.css";

interface ButtonProps {
	id: string;
	disabled?: boolean;
	onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
	return (
		<button
			className='form-button'
			id={props.id}
			onClick={props.onClick}
			disabled={props.disabled}>
			{props.children}
		</button>
	);
};

export default Button;
