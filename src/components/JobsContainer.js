import { useEffect } from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useSelector, useDispatch } from "react-redux";
import { Loading, PageBtnContainer } from "./index";
import { getAllJobs } from "../featurs/alljobs/allJobsSlice";

const JobsContainer = () => {
	useEffect(() => {
		dispatch(getAllJobs());
	}, []);
	const {
		jobs,
		isLoading,
		page,
		totalJobs,
		numOfPages,
		search,
		searchStatus,
		searchType,
		sort,
	} = useSelector((state) => state.allJobs);

	useEffect(() => {
		dispatch(getAllJobs());
		// eslint-disable-next-line
	}, [page, search, searchStatus, searchType, sort]);
	const dispatch = useDispatch();

	if (isLoading) return <Loading center />;
	if (jobs.length === 0) {
		return (
			<Wrapper>
				<h2>No jobs to display...</h2>
			</Wrapper>
		);
	}
	return (
		<Wrapper>
			<h5>
				{totalJobs} job{jobs.length > 1 && "s"} found
			</h5>
			<div className="jobs">
				{jobs.map((job) => {
					return <Job key={job._id} {...job} />;
				})}
			</div>
			{numOfPages > 1 && <PageBtnContainer />}
		</Wrapper>
	);
};
export default JobsContainer;