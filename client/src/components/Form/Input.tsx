import React from "react";
import "./Form.css";

interface InputProps {
	placeholder: string;
	id: string;
}

const Input: React.FC<InputProps> = (props) => {
	return <input className='form-input' {...props} />;
};
export default Input;
