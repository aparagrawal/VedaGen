import React from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
const Main = () => {
	return (
		<div className="main">
			<div className="nav">
				<div className="nav-title">
					<h1 className="vedagen-title">VedaGen</h1>
					<div className="title-glow"></div>
				</div>
				<img src={assets.user_icon} alt="" />
			</div>
			<div className="main-container">
				<div className="greet">
					<p>
						<span>Hello , dev</span>
					</p>
					<p>How can i help u today</p>
				</div>
				<div className="cards">
					<div className="card">
						<p>Suggest me some react tutorials</p>
						<img src={assets.compass_icon} alt="" />
					</div>
					<div className="card">
						<p>Briefly explain the concept of space complexity</p>
						<img src={assets.bulb_icon} alt="" />
					</div>
					<div className="card">
						<p>Give the best place to eat </p>
						<img src={assets.message_icon} alt="" />
					</div>
					<div className="card">
						<p>Briefly summarize the topic : Machine laerning</p>
						<img src={assets.code_icon} alt="" />
					</div>
				</div>
				<div className="main-bottom">
					<div className="search-box">
						<input type="text" placeholder="Enter a prompt here" />
						<div>
							<img src={assets.gallery_icon} alt="" />
							<img src={assets.mic_icon} alt="" />
							<img src={assets.send_icon} alt="" />
						</div>
					</div>
					<p className="bottom-info">
						VedaGen may display innacurate information about people so please
						double check in.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Main;
