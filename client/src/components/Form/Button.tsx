import React from "react";
import "./Form.css";

interface ButtonProps {
	id: string;
	disabled?: boolean;
	icon?: JSX.Element;
	onClick: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
	return (
		<button
			className='form-button'
			id={props.id}
			onClick={props.onClick}
			disabled={props.disabled}>
			<span
				className={
					props.icon ? "form-button-children-with-icon" : "form-button-children"
				}>
				{props.children}
			</span>
			{props.icon && <span className='form-button-icon'>{props.icon}</span>}
		</button>
	);
};

export default Button;
