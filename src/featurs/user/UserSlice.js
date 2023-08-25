import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import {
	addUserToLocalStorage,
	getUserFromLocalStorage,
	removeUserFromLocalStorage,
} from "../../utils/localStorage";
const initialState = {
	user: getUserFromLocalStorage(),
	isLoading: false,
	isSidebarOpen: true,
};
export const registerUser = createAsyncThunk(
	"user/registerUser",
	async (user, thunkAPI) => {
		try {
			console.log(user);
			const res = await customFetch.post("/auth/register", user);
			return res.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);
export const loginUser = createAsyncThunk(
	"user/loginUser",
	async (user, thunkAPI) => {
		try {
			const res = await customFetch.post("/auth/login", user);
			return res.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);
export const updateUser = createAsyncThunk(
	"user/updateUser",
	async (user, thunkAPI) => {
		try {
			const res = await customFetch.patch("/auth/updateUser", user, {
				headers: {
					Authorization: `Bearer ${
						thunkAPI.getState().user.user.token
					}`,
				},
			});
			return res.data;
		} catch (error) {
			if (error.response.status === 401) {
				thunkAPI.dispatch(logoutUser());
				return thunkAPI.rejectWithValue("Unouthrized logout");
			}
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		toggleSidebar: (state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},
		logoutUser: (state, { payload }) => {
			state.user = null;
			state.isSidebarOpen = false;
			removeUserFromLocalStorage();
			if (payload) toast.success(payload);
		},
	},
	extraReducers: {
		[registerUser.pending]: (state) => {
			state.isLoading = true;
		},
		[registerUser.fulfilled]: (state, { payload }) => {
			const user = payload.user;
			state.isLoading = false;
			state.user = user;
			addUserToLocalStorage(user);
			toast.success("hello there " + user.name);
		},
		[registerUser.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		[loginUser.pending]: (state) => {
			state.isLoading = true;
		},
		[loginUser.fulfilled]: (state, { payload }) => {
			const user = payload.user;
			state.isLoading = false;
			state.user = user;
			addUserToLocalStorage(user);
			toast.success("welcome back");
		},
		[loginUser.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		[updateUser.pending]: (state) => {
			state.isLoading = true;
		},
		[updateUser.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.user = payload.user;
			addUserToLocalStorage(payload.user);
			toast.success("user Updated");
		},
		[updateUser.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
	},
});
export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;
