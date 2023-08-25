import { configureStore } from "@reduxjs/toolkit";
import allJobsSlice from "./featurs/alljobs/allJobsSlice";
import jobSlice from "./featurs/job/jobSlice";
import UserSlice from "./featurs/user/UserSlice";

const store = configureStore({
	reducer: {
		user: UserSlice,
		job: jobSlice,
		allJobs: allJobsSlice,
	},
});
export default store;
