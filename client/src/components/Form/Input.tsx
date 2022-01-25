import React from "react";
import "./Form.css";

interface InputProps {
	placeholder: string;
	id: string;
	update: (value: any) => void;
}

const Input: React.FC<InputProps> = (props) => {
	return (
		<input
			className='form-input'
			id={props.id}
			onChange={(e) => props.update(e.target.value)}
			placeholder={props.placeholder}
		/>
	);
};
export default Input;
