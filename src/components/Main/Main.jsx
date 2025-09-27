import { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { ApiContext } from "../../Context/ApiContext";

const Main = () => {
	const {
		prevPrompts,
		setPrevPromts,
		onSent,
		setRecentPrompts,
		recentPrompts,
		showResult,
		loading,
		resultData,
		input,
		setInput,
		isMobileMenuOpen,
		setIsMobileMenuOpen,
	} = useContext(ApiContext);

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<>
			{/* Mobile Overlay */}
			<div
				className={`mobile-overlay ${isMobileMenuOpen ? "active" : ""}`}
				onClick={closeMobileMenu}
			></div>

			<div className="main">
				<div className="nav">
					<div className="nav-left">
						{/* Mobile Menu Button */}
						<img
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							src={assets.menu_icon}
							alt="Menu"
							className="mobile-menu-btn"
						/>
						<div className="nav-title">
							<h1 className="vedagen-title">VedaGen</h1>
							<div className="title-glow"></div>
						</div>
					</div>
					<img src={assets.user_icon} alt="" />
				</div>
				<div className="main-container">
					{!showResult ? (
						<>
							<div className="greet">
								<p>
									<span>Whats up, folks</span>
								</p>
								<p>How can i help you today</p>
							</div>
							<div className="cards">
								<div
									className="card"
									onClick={() =>
										onSent(
											"Suggest me some comprehensive React tutorials for beginners to advanced developers, including best practices and modern techniques.",
										)
									}
								>
									<p>React Development Guide</p>
									<img src={assets.compass_icon} alt="" />
								</div>
								<div
									className="card"
									onClick={() =>
										onSent(
											"Explain JavaScript async/await and Promises with practical examples and common use cases for modern web development.",
										)
									}
								>
									<p>JavaScript Async Concepts</p>
									<img src={assets.bulb_icon} alt="" />
								</div>
								<div
									className="card"
									onClick={() =>
										onSent(
											"Help me create a comprehensive productivity system for managing daily tasks, goals, and time effectively. Include methods, tools, and best practices.",
										)
									}
								>
									<p>Productivity Tips & Systems</p>
									<img src={assets.message_icon} alt="" />
								</div>
								<div
									className="card"
									onClick={() =>
										onSent(
											"Explain AI and machine learning concepts in simple terms, including real-world applications, types of ML, and future trends. Make it beginner-friendly.",
										)
									}
								>
									<p>AI & Machine Learning Basics</p>
									<img src={assets.code_icon} alt="" />
								</div>
							</div>
						</>
					) : (
						<>
							<div className="result">
								<div className="result-title">
									<img src={assets.user_icon} alt="" />
									<p>{recentPrompts}</p>
								</div>

								<div className="result-data">
									<img src={assets.gemini_icon} />
									{loading ? (
										<div className="loader">
											<hr />
											<hr />
											<hr />
										</div>
									) : (
										<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
									)}
								</div>
							</div>
						</>
					)}

					<div className="main-bottom">
						<div className="search-box">
							<input
								onChange={(e) => setInput(e.target.value)}
								value={input}
								type="text"
								placeholder="Enter a prompt here"
							/>
							<div>
								<img src={assets.gallery_icon} alt="" />
								<img src={assets.mic_icon} alt="" />
								{input ? (
									<img onClick={onSent} src={assets.send_icon} alt="" />
								) : null}
							</div>
						</div>
						<p className="bottom-info">
							VedaGen may display innacurate information about people so please
							double check it.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Main;
