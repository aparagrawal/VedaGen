import { createContext, useState } from "react";
import main from "../Config/VedaGenKey";
import callGeminiWithAxios from "../Config/VedaGenKeyAxios";

export const ApiContext = createContext();

const ApiContextProvider = ({ children }) => {
	const [input, setInput] = useState("");
	const [recentPrompts, setRecentPrompts] = useState("");
	const [prevPrompts, setPrevPromts] = useState([]);
	const [showResult, setShowResult] = useState("");
	const [loading, setLoading] = useState("");
	const [resultData, setResultData] = useState("");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const delaypara = (index, nextWord) => {
		setTimeout(function () {
			setResultData((prev) => prev + nextWord);
		}, 30 * index);
	};

	const handleNewChat = () => {
		setLoading(false);
		setShowResult(false);
		setPrevPromts([]);
	};

	const onSent = async (prompt) => {
		try {
			setLoading(true);
			setResultData("");
			setShowResult(true);
			console.log("this is my prompt", prompt);
			let response;
			let currentPrompt;

			if (prompt && typeof prompt === "string" && prompt.trim() !== "") {
				currentPrompt = prompt;
				setRecentPrompts(prompt);
				response = await callGeminiWithAxios(prompt);
			} else {
				currentPrompt = input;
				setRecentPrompts(input);
				setPrevPromts((prev) => [...prev, input]);
				response = await callGeminiWithAxios(input);
			}

			setInput("");

			let responseArray = response.split("**");
			let newResponse = ""; // Initialize as empty string
			for (let i = 0; i < responseArray.length; i++) {
				if (i === 0 || i % 2 !== 1) {
					newResponse += responseArray[i];
				} else {
					newResponse += "<b>" + responseArray[i] + "</b>";
				}
			}

			let finalResponse = newResponse.split("*").join("</br>");
			let finalResponseArray = finalResponse.split(" ");
			for (let i = 0; i < finalResponseArray.length; i++) {
				const nextword = finalResponseArray[i];
				delaypara(i, nextword + " ");
			}
		} catch (error) {
			console.error("Error:", error);
			setResultData("Sorry, there was an error processing your request.");
			setShowResult(true);
		} finally {
			setLoading(false);
		}
	};

	const initialValues = {
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
		handleNewChat,
		isMobileMenuOpen,
		setIsMobileMenuOpen,
	};

	return (
		<ApiContext.Provider value={initialValues}>{children}</ApiContext.Provider>
	);
};

export default ApiContextProvider;
