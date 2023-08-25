import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import { clearFilters, handleChange } from "../featurs/alljobs/allJobsSlice";
import { useState, useMemo } from "react";
const SearchContainer = () => {
	const [localSearch, setLocalSearch] = useState("");
	const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
		useSelector((store) => store.allJobs);
	const dispatch = useDispatch();
	const handleSearch = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ name, value }));
	};
	const debounce = () => {
		let timeoutID;
		return (e) => {
			setLocalSearch(e.target.value);
			clearTimeout(timeoutID);
			timeoutID = setTimeout(() => {
				dispatch(
					handleChange({
						name: e.target.name,
						value: e.target.value,
					})
				);
			}, 1000);
		};
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLocalSearch("");
		dispatch(clearFilters());
	};

	const optimizedDebounce = useMemo(() => debounce(), []);
	const { jobTypeOptions, statusOptions } = useSelector((state) => state.job);
	return (
		<Wrapper>
			<form className="form">
				<h4>search form</h4>
				<div className="form-center">
					<FormRow
						labelText="search"
						type="text"
						name="search"
						value={localSearch}
						handleChange={optimizedDebounce}
					/>
					{/* search by status */}
					<FormRowSelect
						labelText="status"
						name="searchStatus"
						value={searchStatus}
						handleChange={handleSearch}
						list={["all", ...statusOptions]}
					/>
					{/* search by type */}
					<FormRowSelect
						labelText="type"
						name="searchType"
						value={searchType}
						handleChange={handleSearch}
						list={["all", ...jobTypeOptions]}
					/>
					{/* sort */}
					<FormRowSelect
						name="sort"
						value={sort}
						handleChange={handleSearch}
						list={sortOptions}
					/>
					<button
						className="btn btn-block btn-danger"
						disabled={isLoading}
						onClick={handleSubmit}
					>
						clear filters
					</button>
				</div>
			</form>
		</Wrapper>
	);
};
export default SearchContainer;
