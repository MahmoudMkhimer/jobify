import { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../featurs/user/UserSlice";
import { useNavigate } from "react-router-dom";
const initialState = {
	name: "",
	email: "",
	password: "",
	isMember: true,
};

const Register = () => {
	const navigate = useNavigate();
	const { user, isLoading } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [values, setValues] = useState(initialState);
	const handleChange = (e) => {
		const name = e.target.name,
			value = e.target.value;
		setValues({ ...values, [name]: value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		const { name, isMember, password, email } = values;
		if (email && password && (isMember || name)) {
			if (isMember) dispatch(loginUser({ email, password }));
			else dispatch(registerUser({ name, email, password }));
		} else toast.error("please fill all the fields");
	};
	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	};
	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate("/");
			}, 1000);
		}
	}, [user, navigate]);
	return (
		<Wrapper>
			<form action="" className="form" onSubmit={onSubmit}>
				<Logo />
				<h3>{values.isMember ? "login" : "register"}</h3>

				{!values.isMember && (
					<FormRow
						type="text"
						handleChange={handleChange}
						name="name"
						labelText="Name"
						value={values.name}
					/>
				)}
				<FormRow
					type="email"
					handleChange={handleChange}
					name="email"
					labelText="email"
					value={values.email}
				/>
				<FormRow
					type="password"
					handleChange={handleChange}
					name="password"
					labelText="password"
					value={values.password}
				/>

				<div className="form-row">
					<button type="submit" className="btn btn-block">
						{isLoading ? "loading..." : "submit"}
					</button>
					<p>
						{values.isMember
							? "Not a member yet?"
							: "Alredy a member?"}
						<button
							type="button"
							onClick={toggleMember}
							className="member-btn"
						>
							{!values.isMember ? "login" : "register"}
						</button>
					</p>
					<button
						type="button"
						className="btn btn-block btn-hipster"
						disabled={isLoading}
						onClick={() => {
							dispatch(
								loginUser({
									email: "testUser@test.com",
									password: "secret",
								})
							);
						}}
					>
						{isLoading ? "loading..." : "demo"}
					</button>
				</div>
			</form>
		</Wrapper>
	);
};
export default Register;
