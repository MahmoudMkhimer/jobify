import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { logoutUser } from "../user/UserSlice";
import { clearValues } from "../job/jobSlice";
const initialFiltersState = {
	search: "",
	searchStatus: "all",
	searchType: "all",
	sort: "latest",
	sortOptions: ["latest", "oldest", "a-z", "z-a"],
};
const initialState = {
	isLoading: true,
	jobs: [],
	totalJobs: 0,
	numOfPages: 1,
	page: 1,
	stats: {},
	monthlyApplications: [],
	...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
	"allJobs/getJobs",
	async (_, thunkAPI) => {
		const { page, search, searchStatus, searchType, sort } =
			thunkAPI.getState().allJobs;
		let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
		if (search) {
			url = url + `&search=${search}`;
		}
		try {
			const resp = await customFetch.get(url, {
				headers: {
					Authorization: `Bearer ${
						thunkAPI.getState().user.user.token
					}`,
				},
			});
			return resp.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);
export const showStats = createAsyncThunk(
	"allJobs/showStats",
	async (_, thunkAPI) => {
		try {
			const res = await customFetch.get("/jobs/stats", {
				headers: {
					Authorization: `Bearer ${
						thunkAPI.getState().user.user.token
					}`,
				},
			});
			return res.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);
export const clearStore = createAsyncThunk(
	"user/clearStore",
	async (message, thunkAPI) => {
		try {
			thunkAPI.dispatch(logoutUser(message));
			// clear jobs value
			thunkAPI.dispatch(clearAllJobsState());
			// clear job input values
			thunkAPI.dispatch(clearValues());
			return Promise.resolve();
		} catch (error) {}
	}
);
const allJobsSlice = createSlice({
	name: "allJobs",
	initialState,
	reducers: {
		showLoading: (state) => {
			state.isLoading = true;
		},
		hideLoading: (state) => {
			state.isLoading = false;
		},
		handleChange: (state, { payload: { name, value } }) => {
			state.page = 1;
			state[name] = value;
		},
		clearFilters: (state) => {
			return { ...state, ...initialFiltersState };
		},
		changePage: (state, { payload }) => {
			state.page = payload;
		},
		clearAllJobsState: () => initialState,
	},
	extraReducers: {
		[getAllJobs.pending]: (state) => {
			state.isLoading = true;
		},
		[getAllJobs.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.jobs = payload.jobs;
			state.numOfPages = payload.numOfPages;
			state.totalJobs = payload.totalJobs;
		},
		[getAllJobs.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		[showStats.pending]: (state) => {
			state.isLoading = true;
		},
		[showStats.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.stats = payload.defaultStats;
			state.monthlyApplications = payload.monthlyApplications;
		},
		[showStats.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		[clearStore.rejected]: () => {
			toast.error("There was an error");
		},
	},
});

export const {
	showLoading,
	hideLoading,
	handleChange,
	clearFilters,
	changePage,
	clearAllJobsState,
} = allJobsSlice.actions;
export default allJobsSlice.reducer;
