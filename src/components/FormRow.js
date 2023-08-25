const FormRow = ({ value, handleChange, name, type, labelText }) => {
	return (
		<div className="form-row">
			<label htmlFor={name}>{labelText}</label>
			<input
				className="form-input"
				type={type}
				name={name}
				id={name}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
};
export default FormRow;
