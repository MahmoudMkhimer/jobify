import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useState } from "react";
import { toggleSidebar, logoutUser } from "../featurs/user/UserSlice";
// import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearStore } from "../featurs/alljobs/allJobsSlice";

const NavBar = () => {
	const { user } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const [showLogout, setShowLogout] = useState(false);
	return (
		<Wrapper>
			<div className="nav-center">
				<button
					type="button"
					className="toggle-btn"
					onClick={() => {
						dispatch(toggleSidebar());
					}}
				>
					<FaAlignLeft />
				</button>
				<div>
					<Logo />
					<h3 className="logo-text">dashboard</h3>
				</div>
				<div className="btn-container">
					<button
						type="button"
						className="btn"
						onClick={() => {
							setShowLogout(!showLogout);
						}}
					>
						<FaUserCircle />
						{user && user.name}
						<FaCaretDown />
					</button>
					<div
						className={
							showLogout ? "dropdown show-dropdown" : "dropdown"
						}
					>
						<button
							className="dropdown-btn"
							type="button"
							onClick={() => {
								dispatch(clearStore());
								dispatch(logoutUser("Logging out..."));
							}}
						>
							logout
						</button>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};
export default NavBar;
