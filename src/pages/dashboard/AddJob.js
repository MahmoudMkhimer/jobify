import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import FormRow from "../../components/FormRow";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRowSelect } from "../../components";
import {
	handleChange,
	clearValues,
	createJob,
	updateJob,
} from "../../featurs/job/jobSlice";

const AddJob = () => {
	const {
		isLoading,
		position,
		company,
		jobLocation,
		jobType,
		jobTypeOptions,
		status,
		statusOptions,
		isEditing,
		editJobId,
	} = useSelector((store) => store.job);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!position || !company || !jobLocation) {
			toast.error("Please Fill Out All Fields");
			return;
		}
		if (isEditing) {
			dispatch(
				updateJob({
					jobId: editJobId,
					job: {
						position,
						company,
						jobLocation,
						jobType,
						status,
					},
				})
			);
			return;
		}

		dispatch(
			createJob({ position, company, jobLocation, jobType, status })
		);
	};
	const handleJobInput = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		dispatch(handleChange({ name, value }));
	};
	return (
		<Wrapper>
			<form action="" className="form">
				<h3>{isEditing ? "edite job " : "add job"}</h3>
				<div className="form-center">
					{/* position */}
					<FormRow
						type="text"
						labelText="position"
						name="position"
						value={position}
						handleChange={handleJobInput}
					/>
					{/* company */}
					<FormRow
						type="text"
						labelText="company"
						name="company"
						value={company}
						handleChange={handleJobInput}
					/>
					{/* location */}
					<FormRow
						type="text"
						labelText="job location"
						name="jobLocation"
						value={jobLocation}
						handleChange={handleJobInput}
					/>

					<FormRowSelect
						value={status}
						handleChange={handleJobInput}
						name="status"
						id="status"
						labelText="status"
						list={statusOptions}
					/>
					<FormRowSelect
						value={jobType}
						handleChange={handleJobInput}
						name="jobType"
						labelText="job type"
						list={jobTypeOptions}
					/>

					<div className="btn-container">
						<button
							type="button"
							className="btn btn-block clear-btn"
							onClick={() => dispatch(clearValues())}
						>
							clear
						</button>
						<button
							type="submit"
							className="btn btn-block submit-btn"
							onClick={handleSubmit}
							disabled={isLoading}
						>
							submit
						</button>
					</div>
				</div>
			</form>
		</Wrapper>
	);
};
export default AddJob;
