import React from "react";
import main from "../assets/images/main.svg";
import Wraper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import { Link } from "react-router-dom";
const Landing = () => {
	return (
		<Wraper>
			<nav>
				<Logo />
			</nav>
			<div className="container page">
				<div className="info">
					<h1>
						jop <span>tracking</span> app
					</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Doloribus modi repellat porro asperiores quae illo,
						quisquam omnis sapiente ut esse consequuntur, debitis
						corporis voluptatem. Mollitia fugiat labore nam
						necessitatibus cupiditate.
					</p>
					<Link to="/register" className="btn btn-hero">
						login/register
					</Link>
				</div>
				<img src={main} className="img main-img" alt="man" />
			</div>
		</Wraper>
	);
};

export default Landing;
