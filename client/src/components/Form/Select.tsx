import React, { useState, useEffect } from "react";
import { Errors, Error } from "../../types";
import "./Form.css";

interface SelectProps {
	id: string;
	options: any[];
	placeholder: string;
	errors?: Errors | null;
	location?: string;
	update: (value: any) => void;
}

const Select: React.FC<SelectProps> = (props) => {
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		setError(null);
		if (props.errors) {
			for (let i = 0; i < props.errors.length; i++) {
				const error = props.errors[i];
				if (props.location === error.location) {
					setError(error);
				}
			}
		}
	}, [props.errors]);

	return (
		<div id={props.id} className='form-select-container'>
			<select
				className='form-select'
				onChange={(e) => props.update(e.target.value)}
				style={error ? { border: "1.5px solid red" } : {}}>
				<option disabled selected hidden value=''>
					{props.placeholder}
				</option>
				{props.options.map((option) => {
					return (
						<option key={option} value={option}>
							{option}
						</option>
					);
				})}
			</select>
			{error && <p className='form-input-error-message'>{error.message}</p>}
		</div>
	);
};

export default Select;
