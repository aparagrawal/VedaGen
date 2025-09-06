import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
function SideBar() {
	const [extended, setExtended] = useState(false);
	return (
		<div className="sidebar">
			<div className="top">
				<img
					onClick={() => setExtended(!extended)}
					src={assets.menu_icon}
					alt=""
					className="menu"
				/>
				<div className="new-chat">
					<img src={assets.plus_icon} alt="" className="plus" />
					{extended ? <p>New Chat</p> : null}
				</div>
				{extended ? (
					<div className="recent">
						<p className="recent-title">Recent Chat</p>
						<div className="recent-entry">
							<img src={assets.message_icon} alt="" className="user" />
							<p>what is react ...</p>
						</div>
					</div>
				) : null}
			</div>
			<div className="bottom">
				<div className="bottom-item recent-entry">
					<img src={assets.question_icon} alt="" className="question" />
					{extended ? <p>Help</p> : null}
				</div>

				<div className="bottom-item recent-entry">
					<img src={assets.history_icon} alt="" className="question" />
					{extended ? <p>Activity</p> : null}
				</div>
				<div className="bottom-item recent-entry">
					<img src={assets.setting_icon} alt="" className="question" />
					{extended ? <p>Settings</p> : null}
				</div>
			</div>
		</div>
	);
}

export default SideBar;
