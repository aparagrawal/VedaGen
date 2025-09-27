import React, { useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { ApiContext } from "../../Context/ApiContext";
function SideBar() {
	const [extended, setExtended] = useState(false);
	const {
		prevPrompts,
		setPrevPromts,
		onSent,
		setRecentPrompts,
		recentPrompts,
		handleNewChat,
		isMobileMenuOpen,
		setIsMobileMenuOpen,
	} = useContext(ApiContext);

	const recentData = async (prompt) => {
		await onSent(prompt);
		setIsMobileMenuOpen(false); // Close mobile menu after selection
	};

	// Separate toggle for desktop sidebar extension
	const toggleSidebar = () => {
		setExtended(!extended);
	};

	const handleNewChatClick = () => {
		handleNewChat();
		setIsMobileMenuOpen(false); // Close mobile menu after new chat
	};

	return (
		<div className={`sidebar ${isMobileMenuOpen ? "open" : ""}`}>
			<div className="top">
				<img
					onClick={toggleSidebar}
					src={assets.menu_icon}
					alt=""
					className="menu"
				/>
				<div onClick={handleNewChatClick} className="new-chat">
					<img src={assets.plus_icon} alt="" className="plus" />
					{extended || isMobileMenuOpen ? <p>New Chat</p> : null}
				</div>
				{extended || isMobileMenuOpen ? (
					<div className="recent">
						<p className="recent-title">Recent Chat</p>
						{prevPrompts.map((item, index) => {
							return (
								<div
									key={index}
									onClick={() => recentData(item)}
									className="recent-entry"
								>
									<img src={assets.message_icon} alt="" className="user" />
									<p>{item.slice(0, 18)} ...</p>
								</div>
							);
						})}
					</div>
				) : null}
			</div>
			<div className="bottom">
				<div className="bottom-item recent-entry">
					<img src={assets.question_icon} alt="" className="question" />
					{extended || isMobileMenuOpen ? <p>Help</p> : null}
				</div>

				<div className="bottom-item recent-entry">
					<img src={assets.history_icon} alt="" className="question" />
					{extended || isMobileMenuOpen ? <p>Activity</p> : null}
				</div>
				<div className="bottom-item recent-entry">
					<img src={assets.setting_icon} alt="" className="question" />
					{extended || isMobileMenuOpen ? <p>Settings</p> : null}
				</div>
			</div>
		</div>
	);
}

export default SideBar;
