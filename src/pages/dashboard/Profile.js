import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import { toast } from "react-toastify";
import { FormRow } from "../../components/index";

import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../featurs/user/UserSlice";
const Profile = () => {
	const { isLoading, user } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		name: user ? user.name : "",
		lastName: user ? user.lastName : "",
		email: user ? user.email : "",
		location: user ? user.location : "",
	});
	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, lastName, location, email } = userData;
		if (!name || !lastName || !email || !location)
			toast.error("fill out all fields");
		else dispatch(updateUser(userData));
	};
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setUserData({ ...userData, [name]: value });
	};
	return (
		<Wrapper>
			<form action="" className="form" onSubmit={handleSubmit}>
				<h3>profile</h3>
				<div className="form-center">
					<FormRow
						type="text"
						name="name"
						value={userData.name}
						handleChange={handleChange}
					/>
					<FormRow
						type="text"
						name="lastName"
						value={userData.lastName}
						handleChange={handleChange}
					/>
					<FormRow
						type="email"
						name="email"
						value={userData.email}
						handleChange={handleChange}
					/>
					<FormRow
						type="text"
						name="location"
						value={userData.location}
						handleChange={handleChange}
					/>
					<button
						type="submit"
						className="btn btn-block"
						disabled={isLoading}
					>
						{isLoading ? "please wait..." : "save changes"}
					</button>
				</div>
			</form>
		</Wrapper>
	);
};
export default Profile;
