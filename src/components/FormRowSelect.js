const FormRowSelect = ({ value, handleChange, name, labelText, list }) => {
	return (
		<div className="form-row">
			<label htmlFor={name}>{labelText || name}</label>
			<select
				className="form-select"
				name={name}
				id={name}
				value={value}
				onChange={handleChange}
			>
				{list.map((item, index) => {
					return (
						<option value={item} key={index}>
							{item}
						</option>
					);
				})}
			</select>
		</div>
	);
};
export default FormRowSelect;
