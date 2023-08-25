import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	Landing,
	Register,
	Error,
	AddJob,
	AllJobs,
	Profile,
	SharedLayout,
	Stats,
} from "./pages/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./pages/ProtectedRoute";
function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<SharedLayout />
						</ProtectedRoute>
					}
				>
					<Route index element={<Stats />} />
					<Route path="all-jobs" element={<AllJobs />} />
					<Route path="add-Job" element={<AddJob />} />
					<Route path="profile" element={<Profile />} />
				</Route>

				<Route path="landing" element={<Landing />} />
				<Route path="register" element={<Register />} />
				<Route path="*" element={<Error />} />
			</Routes>
			<ToastContainer position="top-center" />
		</Router>
	);
}

export default App;
