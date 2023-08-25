import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
// import { getUserFromLocalStorage } from "../../utils/localStorage";
import { logoutUser } from "../user/UserSlice";
import { showLoading, hideLoading, getAllJobs } from "../alljobs/allJobsSlice";
const initialState = {
	isLoading: false,
	position: "",
	company: "",
	jobLocation: "",
	jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
	jobType: "full-time",
	statusOptions: ["interview", "declined", "pending"],
	status: "pending",
	isEditing: false,
	editJobId: "",
};
export const updateJob = createAsyncThunk(
	"job/editJob",
	async ({ jobId, job }, thunkAPI) => {
		try {
			const res = await customFetch.patch(`jobs/${jobId}`, job, {
				headers: {
					authorization: `Bearer ${
						thunkAPI.getState().user.user.token
					}`,
				},
			});
			thunkAPI.dispatch(clearValues());
			return res.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);
export const deleteJob = createAsyncThunk(
	"job/deletejob",
	async (jobId, thunkAPI) => {
		thunkAPI.dispatch(showLoading());
		try {
			const res = await customFetch.delete(`/jobs/${jobId}`, {
				headers: {
					Authorization: `Bearer ${
						thunkAPI.getState().user.user.token
					}`,
				},
			});
			thunkAPI.dispatch(getAllJobs());
			return res.data;
		} catch (error) {
			thunkAPI.dispatch(hideLoading());
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);
export const createJob = createAsyncThunk(
	"job/createJob",
	async (job, thunkAPI) => {
		try {
			const res = await customFetch.post("/jobs", job, {
				headers: {
					Authorization: `Bearer ${
						thunkAPI.getState().user.user.token
					}`,
				},
			});
			thunkAPI.dispatch(clearValues());
			return res.data;
		} catch (error) {
			if (error.response.status === 401) {
				thunkAPI.dispatch(logoutUser());
				return thunkAPI.rejectWithValue("Unothrized! Logging Out...");
			}
			return thunkAPI.rejectWithValue(error.response.msg);
		}
	}
);
const jobSlice = createSlice({
	name: "job",
	initialState,
	reducers: {
		handleChange: (state, { payload: { name, value } }) => {
			state[name] = value;
		},
		clearValues: () => {
			return { ...initialState };
		},
		editJob: (state, { payload }) => {
			return { ...state, isEditing: true, ...payload };
		},
	},
	extraReducers: {
		[createJob.pending]: (state) => {
			state.isLoading = true;
		},
		[createJob.fulfilled]: (state, action) => {
			state.isLoading = false;
			toast.success("Job crated");
		},
		[createJob.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		[deleteJob.rejected]: (state, { payload }) => {
			toast.error(payload);
		},
		[updateJob.pending]: (state) => {
			state.isLoading = true;
		},
		[updateJob.fulfilled]: (state) => {
			state.isLoading = false;
			toast.success("Job Modified...");
		},
		[updateJob.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
	},
});
export const { handleChange, clearValues, editJob } = jobSlice.actions;
export default jobSlice.reducer;
